# Changelog

## 2.12.1-2

- Debrand user-visible upstream-core strings at image build time
  (`debrand/transform.mjs`): settings-schema titles/descriptions (these drive
  the frontend settings page), backend log/error strings, and both served
  frontend bundles including the onboarding page (precompressed `.br`
  variants are regenerated).
- Settings-schema placeholder default/examples for the discovery topics now
  show the ApexOS core prefix (`apexos` / `apexos/status`), matching the values
  the app already pins at startup.
- No wire-protocol changes: the application's settings keys, its
  MQTT-discovery topics and payload keys are untouched.

## 2.12.1-1

- Initial ApexOS port of the Zigbee2MQTT add-on (upstream 2.12.1-1, Zigbee2MQTT 2.12.1).
- MQTT discovery topic and status topic default to the ApexOS core discovery
  prefix (`apexos` / `apexos/status`) so discovered devices appear in ApexOS
  out of the box.
- Data path lives on the ApexOS configuration mount (`/config/zigbee2mqtt`).
- Builds locally from the ApexOS base image; Zigbee2MQTT itself is fetched from
  the upstream Koenkk/zigbee2mqtt release tarball at build time.
