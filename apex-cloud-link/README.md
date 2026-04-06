# Apex Cloud Link

ApexOS addon that connects your device to Cloud Connect using FRP.

## What it does
- Publishes ApexOS web endpoint over FRP HTTP using your subdomain
- Authenticates the tunnel using your Cloud Connect access token metadata
- Automatically registers for admin fleet visibility and heartbeats
- Automatically receives an assigned SSH remote port from Cloud Connect

## Required options
- `subdomain`
- `access_token`

## Required addon permissions
- `hassio_api: true`
- `homeassistant_api: true`

These are required for Google Home bridge because the addon reads `/api/states` and calls local Home Assistant services via Supervisor Core API.

## Automatic behavior
- Device identity is auto-derived from hostname
- Remote SSH user is fixed to `root`
- Local SSH port is fixed to `22`
- Fleet reporting is always enabled
- Cloud API base URL is fixed to `https://cloud.apexinfosys.in`
- Assigned SSH remote port is stored at `/data/cloud_device_ssh_remote_port`
- Device auth token is stored at `/data/cloud_device_token`

## Admin SSH model (Method B)
- Addon still publishes SSH as FRP TCP proxy on assigned remote port.
- Cloud Connect issues admin commands that go through SSH jump host (`ProxyCommand`) with explicit jump and device keys.
- FRPS should bind proxy ports to loopback (`proxyBindAddr = "127.0.0.1"`) so assigned ports are not publicly exposed.

## Google Home entity bridge (MVP)
- Addon periodically reads Home Assistant states from local API (`/api/states`) using configured `access_token`.
- Supported domains are synced to Cloud Connect for Google integration:
  - `switch.*`
  - `light.*`
  - `sensor.*` (temperature-style mapping)
- Addon polls command queue from Cloud Connect and executes service calls locally:
  - on/off -> `<domain>.turn_on` / `<domain>.turn_off`
  - brightness -> `light.turn_on` with brightness value
- Command results are reported back to Cloud Connect for Google fulfillment responses.

All fleet visibility and connect-command generation are admin-only in Cloud Connect (`/admin.html`).
