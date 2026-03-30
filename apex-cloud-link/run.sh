#!/usr/bin/env bashio

# Parse add-on options
CONFIG_PATH=/data/options.json
SUBDOMAIN=$(jq --raw-output ".subdomain" $CONFIG_PATH)
ACCESS_TOKEN=$(jq --raw-output ".access_token" $CONFIG_PATH)

# Basic validation
if [ -z "$SUBDOMAIN" ] || [ -z "$ACCESS_TOKEN" ]; then
    bashio::log.error "Subdomain or Access Token is missing!"
    bashio::log.error "Please register at portal.cloud.apexinfosys.in and configure the Add-on."
    exit 1
fi

bashio::log.info "Initializing Apex Cloud Link for: ${SUBDOMAIN}.cloud.apexinfosys.in"

# 1. Determine Architecture to download the correct FRP Client
ARCH=$(bashio::info.arch)
FRP_VERSION="0.56.0"
FRP_ARCH=""

case $ARCH in
    aarch64) FRP_ARCH="arm64" ;;
    amd64) FRP_ARCH="amd64" ;;
    armhf|armv7) FRP_ARCH="arm" ;;
    i386) FRP_ARCH="386" ;;
    *) 
        bashio::log.error "Unsupported architecture: $ARCH"
        exit 1
        ;;
esac

# 2. Download FRPC if it doesn't exist (cached in /data so it survives restarts)
FRP_DIR="/data/frp"
FRPC_BIN="${FRP_DIR}/frpc"

if [ ! -f "$FRPC_BIN" ]; then
    bashio::log.info "Downloading FRP Client for ${FRP_ARCH}..."
    mkdir -p $FRP_DIR
    
    # Download and extract just the client binary
    wget -qO /tmp/frp.tar.gz "https://github.com/fatedier/frp/releases/download/v${FRP_VERSION}/frp_${FRP_VERSION}_linux_${FRP_ARCH}.tar.gz"
    tar -xzf /tmp/frp.tar.gz -C /tmp/
    mv "/tmp/frp_${FRP_VERSION}_linux_${FRP_ARCH}/frpc" "$FRPC_BIN"
    chmod +x "$FRPC_BIN"
    
    # Cleanup
    rm -rf /tmp/frp*
    bashio::log.info "Download complete."
fi

# 3. Generate the dynamic FRPC Configuration
FRPC_CONFIG="/tmp/frpc.toml"

cat << TOML_EOF > ${FRPC_CONFIG}
# Master connection to your VPS
serverAddr = "cloud.apexinfosys.in"
serverPort = 7000

# Authentication (This is sent to your Node.js API to verify)
auth.method = "token"
auth.token = "${ACCESS_TOKEN}"

# Define the local ApexOS proxy rule
[[proxies]]
name = "ha_web_${SUBDOMAIN}"
type = "http"
localIP = "172.30.32.1"  # Standard ApexOS internal IP in Supervisor
localPort = 1702         # Standard ApexOS Port (1702 instead of 8123)
customDomains = ["${SUBDOMAIN}.cloud.apexinfosys.in"]
TOML_EOF

bashio::log.info "Configuration generated. Connecting to cloud..."

# 4. Start the FRP Client
exec "$FRPC_BIN" -c "$FRPC_CONFIG"
