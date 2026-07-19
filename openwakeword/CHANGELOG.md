# Changelog

## 2.1.1

- Remove the legacy built-in wake word model from the bundled set. Built-in
  options are now Hey Jarvis / Hey Mycroft / Hey Rhasspy / Alexa; custom
  models (including the upcoming ApexOS wake word) load from
  `/share/openwakeword`.

## 2.1.0

- Initial ApexOS port of the openWakeWord add-on (upstream 2.1.0).
- Builds locally from the ApexOS Debian base image.
- Wyoming discovery announces to ApexOS core.
