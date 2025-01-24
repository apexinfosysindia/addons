# Apex Connect+ Add-on: Matter Server

## Installation

Use the following steps to install this add-on.

1. Click the Apex Connect+ My button below to open the add-on page on your
   Apex Connect+ instance.

1. Click the "Install" button to install the add-on.

## How to use

Start the Matter Server add-on to make the WebSocket available to Home
Assistant Core. Install the [Matter integration][matter_integration]
in Apex Connect+ Core.

### Access WebSocket interface externally (advanced)

By default, the Python Matter Server's WebSocket interface is only exposed
internally. It is still possible to enable access through the host interface
To do so, click on "Show disabled ports" and enter a port (e.g. 5580) in the
Matter Server WebSocket server port field.

## Configuration

Add-on configuration:

| Configuration        | Description                                                                 |
| -------------------- | --------------------------------------------------------------------------- |
| log_level            | Logging level of the Matter Server component.                               |
| log_level_sdk        | Logging level for Matter SDK logs.                                          |
| beta                 | Whether to install the latest beta version on startup                       |
| enable_test_net_dcl  | Enable test-net DCL for PAA root certificates and other device information. |
| bluetooth_adapter_id | Set BlueZ Bluetooth Controller ID (for local commissioning)                 |

In case you've found a bug, please [open an issue on our GitHub][issue].

[forum]: https://community.apexinfosys.in
[issue]: https://github.com/apexinfosysindia/addons/issues
[matter_server_repo]: https://github.com/apexinfosysindia-libs/python-matter-server
[matter_integration]: https://www.apexinfosys.in/integrations/matter/
