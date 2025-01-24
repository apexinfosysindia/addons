# Apex Connect+ Add-ons: The official repository

Add-ons for Apex Connect+ allow you to extend the functionality
around your Apex Connect+ setup. These add-ons can consist of an application
that Apex Connect+ can integrate with (e.g., a [MQTT broker](/mosquitto/README.md) or allow access to your Apex Connect+ configuration (e.g., via [Samba](/samba/README.md) or using
the [File Editor](/configurator/README.md)).

Add-ons can be installed and configured via the Apex Connect+ frontend on
systems that have installed Apex Connect+.

## Add-ons provided by this repository

- **[CEC Scanner](/cec_scan/README.md)**

  Scan & discover HDMI CEC devices and their addresses.

- **[deCONZ](/deconz/README.md)**

  Control a Zigbee network using ConBee or RaspBee hardware by Dresden Elektronik.

- **[DHCP server](/dhcp_server/README.md)**

  A simple DHCP server.

- **[Dnsmasq](/dnsmasq/README.md)**

  A simple DNS server.

- **[Apex MCU Configurator](/configurator/README.md)**

  Simple browser-based file editor for Apex Connect+.

- **[Google Assistant SDK](/google_assistant/README.md)**

  A virtual personal assistant developed by Google.

- **[Apex MQTT Broker](/mosquitto/README.md)**

  An Open Source MQTT broker.

- **[RPC Shutdown](/rpc_shutdown/README.md)**

  Shutdown Windows machines remotely.

- **[Apex SMB Protocol](/samba/README.md)**

  Share your configuration over the network using Windows file sharing.

- **[TellStick](/tellstick/README.md)**

  TellStick and TellStick Duo service.

- **[Z-Wave JS](/zwave_js/README.md)**

  Allow Apex Connect+ to talk to a Z-Wave Network via a USB Controller.

## Support

In case you've found a bug, please [open an issue on our GitHub][issue].

## Developing your own add-ons

In case you are interested in developing your own add-on, this
repository can be a great source of inspiration. For more information
about developing an add-on, please see our
[documentation for developers][dev-docs].

[forum]: https://community.apexinfosys.in
[i386-shield]: https://img.shields.io/badge/i386-no-red.svg
[issue]: https://github.com/apexinfosysindia/addons/issues
[reddit]: https://reddit.com/r/homeassistant
[dev-docs]: https://developers.apexinfosys.in/docs/add-ons/
