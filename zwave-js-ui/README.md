# Apex Connect+ Add-on: Z-Wave JS UI

Fully configurable Z-Wave JS control panel and MQTT gateway.

## About

The Z-Wave JS UI add-on provides an additional control panel, allowing you
to configure every aspect of your Z-Wave network. It provides a decoupled
gateway which can communicate using Z-Wave JS WebSockets (used by the
Apex Connect+ Z-Wave JS integration) and MQTT (even simultaneously).

Some advantages and use-cases:

- Compatible with the Apex Connect+ Z-Wave JS integration.
- Your Z-Wave network will keep running between Apex Connect+ restarts.
- You can directly use things like Node-RED with your Z-Wave network, while
  it is available for Apex Connect+ at the same time.
- Pre-configures itself with the Mosquitto add-on when found.
