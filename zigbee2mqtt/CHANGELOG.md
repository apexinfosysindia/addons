# Changelog

## 2.12.1-1

- Initial ApexOS port of the Zigbee2MQTT add-on (upstream 2.12.1-1, Zigbee2MQTT 2.12.1).
- MQTT discovery topic and status topic default to the ApexOS core discovery
  prefix (`apexos` / `apexos/status`) so discovered devices appear in ApexOS
  out of the box.
- Data path lives on the ApexOS configuration mount (`/config/zigbee2mqtt`).
- Builds locally from the ApexOS base image; Zigbee2MQTT itself is fetched from
  the upstream Koenkk/zigbee2mqtt release tarball at build time.
