# Changelog

## 4.1.0

- Builds on the ApexOS base image 3.23-2026.08.0 (Alpine 3.23, latest patch
  release) instead of 3.23-2026.06.1.
- Empty `options` and `schema` entries dropped from the config; no behaviour
  change.
- Tracks upstream 4.1.0. libCEC stays at 7.1.1.

## 4.0

- Initial ApexOS port of the CEC Scanner add-on (upstream 4.0).
- Builds locally from the ApexOS base image (Alpine 3.23); libCEC 7.1.1 is
  compiled at build time from the third-party Pulse-Eight sources.
