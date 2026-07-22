## 6.1.2

- Restore the core API grant lost in the porting wave (fixes the
  repeating "Not permitted API access" warning and entity
  autocomplete in the editor).

# Changelog

## 6.1.1

- App 0.6.1: the fallback API base URL and the docs/examples now use the
  native web port (1702) — the shipped default still pointed at the
  pre-flip port.

## 6.1.0

- The editor now ships as ApexOS Configurator (`apexos-configurator`,
  built from the org `configurator` repository): debranded UI, native
  `APEX_*` settings keys and `AC_` environment prefix (legacy keys keep
  working), core service calls fixed to the `apexos` service domain,
  and base-URL joining no longer breaks on a slash-less API setting.

## 6.0.0

- Initial ApexOS port of the File editor add-on (upstream 6.0.0).
- Base path served by the editor is the ApexOS configuration mount (`/apexos`).
- Builds locally from the ApexOS base image (Alpine 3.23);
  the upstream configurator package (0.6.0) installed from PyPI at build time.
