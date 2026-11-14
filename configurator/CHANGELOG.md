# Changelog

## 6.3.1

Tracks upstream 6.3.1 (covers 6.1.0 to 6.3.1).

- New `log_level` option (`debug`, `info`, `warning`, `error`, `critical`,
  default `info`). Set it to `warning` to stop logging every web request,
  including the container health check.
- The health check calls the editor's own `/api/netstat` endpoint, which does
  not reach the ApexOS API, starts checking every 5 seconds while the editor
  boots, then every 30 seconds.
- Uses the `all_app_configs` folder mapping.
- Builds on the ApexOS base image 3.24-2026.08.0 (Alpine 3.24).
- Not carried over: upstream's editor package 0.7.0 (clean shutdown on
  SIGTERM, typo fixes). The add-on keeps shipping the ApexOS Configurator 0.6.1
  from the org package index until that fork is updated.

## 6.1.2

- Restore the core API grant lost in the porting wave (fixes the
  repeating "Not permitted API access" warning and entity
  autocomplete in the editor).

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
