# Changelog

## 1.4.5

- Source refresh (1.4.3-apexos.2): docs/test housekeeping and the
  dev/test grammar dependency now comes from the org intents package.

## 1.4.4

- Now built from the org `speech-to-phrase` repository (1.4.3-apexos.1):
  native `--apex-*` flags, apexil intent parser, and a fix for entity
  exposure training — the service now calls the native
  `apexos/expose_entity/list` command (the legacy command name it used
  before does not exist on ApexOS core, so vocabulary training against
  exposed entities was silently broken).

## 1.4.3

- Initial ApexOS port of the Speech-to-Phrase add-on (upstream 1.4.3).
- Builds locally from the ApexOS Debian base image.
- Trains against the ApexOS core websocket API via the supervisor proxy.
- Wyoming discovery announces to ApexOS core.
