# Apex Cloud Link

ApexOS addon that connects your device to Cloud Connect using FRP and can optionally report fleet telemetry for admin-only device management.

## What it does
- Publishes ApexOS web endpoint over FRP HTTP using your subdomain
- Authenticates the tunnel using your Cloud Connect access token metadata
- Optionally publishes SSH over FRP TCP (`ssh_remote_port`)
- Optionally reports device presence and logs to Cloud Connect admin fleet APIs

## Required options
- `subdomain`
- `access_token`

## Fleet tracking options (admin-only)
- `fleet_reporting_enabled` (default: `true`)
- `cloud_api_url` (default: `https://cloud.apexinfosys.in`)
- `device_uid` (optional stable id)
- `device_name` (optional friendly display name)

## Optional SSH publish options
- `ssh_remote_port` (default: `0`, disabled)
- `ssh_local_port` (default: `22`)
- `ssh_remote_user` (default: `root`)

When `ssh_remote_port` is greater than `0`, the addon appends a TCP FRP proxy to expose local SSH through FRPS.

## Fleet reporting flow
1. Addon registers with Cloud Connect using `access_token` and device metadata
2. Cloud Connect returns a per-device auth token
3. Addon stores token at `/data/cloud_device_token`
4. Addon sends periodic heartbeats and lifecycle logs

All fleet visibility and connect-command generation are admin-only in Cloud Connect (`/admin.html`).
