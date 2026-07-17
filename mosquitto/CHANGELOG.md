# Changelog

## 7.1.0

- Initial ApexOS port of the Mosquitto broker add-on (upstream 7.1.0).
- Broker system user for core MQTT discovery renamed from the upstream
  default to `apexos` (the `addons` service user is unchanged).
- Builds locally from the ApexOS Debian base image; mosquitto, libwebsockets
  and the mosquitto-go-auth plugin are compiled from their upstream
  third-party sources at build time.
