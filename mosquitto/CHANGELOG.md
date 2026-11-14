# Changelog

## 7.1.3

Tracks upstream 7.1.3 (covers 7.1.1 to 7.1.3).

- Fix: WebSocket clients that send a frame with an empty payload no longer get
  their session dropped by the built-in WebSocket listener (patch to
  Mosquitto 2.1.2, also proposed to the Mosquitto project).
- Fix: a nil pointer panic in the auth plugin's cache during access-control
  checks no longer crashes the broker.
- The image no longer builds libwebsockets: Mosquitto 2.1.2's built-in
  WebSocket support is used. This also removes the build's dependency on the
  libwebsockets.org server.
- A Docker health check (TCP connect to port 1883, every 30 seconds, every 5
  seconds while starting) replaces the `watchdog` URL; the Supervisor restarts
  an unhealthy broker as before when the watchdog is enabled.
- Builds on the ApexOS Debian base image trixie-2026.08.0.

## 7.1.0

- Initial ApexOS port of the Mosquitto broker add-on (upstream 7.1.0).
- Broker system user for core MQTT discovery renamed from the upstream
  default to `apexos` (the `addons` service user is unchanged).
- Builds locally from the ApexOS Debian base image; mosquitto, libwebsockets
  and the mosquitto-go-auth plugin are compiled from their upstream
  third-party sources at build time.
