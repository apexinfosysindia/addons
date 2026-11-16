# Changelog

## 1.4.5.1

- Fix access to ApexOS: the app asked for Supervisor access instead of the
  core access it needs, so its connection was refused, it retried every
  couple of seconds ("Unauthorized WebSocket access!" in the Supervisor log)
  and it never finished starting. It now declares `apexos_core_api`, as
  upstream's app does. No change to the app itself.

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
