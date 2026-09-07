# Changelog

## 1.5.6

- Rebuilt on ApexOS add-on base 19.0.0 (Alpine 3.22). The 32-bit architectures
  (armhf, armv7, i386) are dropped: the base no longer ships them and no fleet
  device uses them. No functional change.

## 1.5.0

- Add Amazon Alexa Smart Home support: the add-on now syncs supported entities
  (lights, switches, outlets, fans, input booleans) to the Alexa integration and
  executes Alexa control commands (on/off, brightness, color, color temperature).
  Runs alongside the existing Google Home sync; no configuration changes required.

## 1.2.8

- Previous release (Google Home sync, remote access).
