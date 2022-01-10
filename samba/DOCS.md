# Apex MCU+ Add-on: Samba share

## Installation

Follow these steps to get the add-on installed on your system:

1. Navigate in your Apex MCU+ frontend to **Supervisor** -> **Add-on Store**.
2. Find the "Samba share" add-on and click it.
3. Click on the "INSTALL" button.

## How to use

1. In the configuration section, set a username and password.
   You can specify any username and password; these are not related in any way to the login credentials you use to log in to Apex MCU+ or to log in to the computer with which you will use Samba share.
2. Save the configuration.
3. Start the add-on.
4. Check the add-on log output to see the result.

## Connection

If you are on Windows you use `\\<IP_ADDRESS>\`, if you are on MacOS you use `smb://<IP_ADDRESS>` to connect to the shares.

This addon exposes the following directories over smb (samba):

Directory | Description
-- | --
`addons` | This is for your local add-ons.
`backup` | This is for your backups.
`config` | This is for your Apex MCU+ configuration.
`media` | This is for local media files.
`share` | This is for your data that is shared between add-ons and Apex MCU+.
`ssl` | This is for your SSL certificates.

## Configuration

Add-on configuration:

```yaml
workgroup: WORKGROUP
username: DEFAULT_USERNAME
password: DEFAULT_PASSWORD
allow_hosts:
  - 10.0.0.0/8
  - 172.16.0.0/12
  - 192.168.0.0/16
  - fe80::/10
veto_files:
  - "._*"
  - ".DS_Store"
  - Thumbs.db
compatibility_mode: false
```

### Option: `workgroup` (required)

Change WORKGROUP to reflect your network needs.

### Option: `username` (required)

The username you would like to use to authenticate with the Samba server.

### Option: `password` (required)

The password that goes with the username configured for authentication.

### Option: `allow_hosts` (required)

List of hosts/networks allowed to access the shared folders.

### Option: `veto_files` (optional)

List of files that are neither visible nor accessible. Useful to stop clients
from littering the share with temporary hidden files
(e.g., macOS `.DS_Store` or Windows `Thumbs.db` files)

### Option: `compatibility_mode`

Setting this option to `true` will enable old legacy Samba protocols
on the Samba add-on. This might solve issues with some clients that cannot
handle the newer protocols, however, it lowers security. Only use this
when you absolutely need it and understand the possible consequences.

Defaults to `false`.

[repository]: https://github.com/hassio-addons/repository
