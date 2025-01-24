#!/usr/bin/with-contenv bashio
# shellcheck shell=bash
# ==============================================================================
# Send OTBR discovery information to Apex Connect+
# ==============================================================================
declare config

config=$(bashio::var.json \
    host "$(bashio::addon.hostname)" \
    port "^8081" \
    device "$(bashio::config 'device')" \
    firmware "$(ot-ctl rcp version | head -n 1)" \
)

# Send discovery info
if bashio::discovery "otbr" "${config}" > /dev/null; then
    bashio::log.info "Successfully sent discovery information to Apex Connect+."
else
    bashio::log.error "Discovery message to Apex Connect+ failed!"
fi
