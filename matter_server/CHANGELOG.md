# Changelog

## 9.3.0

- Matter Server updated from 1.2.6 to 1.5.5 (this covers upstream 9.1.1,
  9.2.0 and 9.3.0):
  - Supports Matter 1.6.1, with many optimizations and fixes in the Matter
    stack.
  - New camera API for WebRTC stream management.
  - Network visualization data exposed for external tools.
  - Dashboard: more cluster command panels, endpoint labels and semantic
    tags, camera, time-synchronization, ICD and Thread improvements.
  - Support for custom cluster data from WAGO devices.
  - Fixes for commissioning, node availability reporting and WebRTC/camera
    handling.
- Panel icon changed to the Matter logo.
- Bundled tools updated: bashio 0.19.0, tempio 2026.07.0, s6-overlay 3.2.3.2.
- Scripts call the `bashio::app.*` functions; the `bashio::addon.*` names are
  deprecated in bashio 0.19.0 and log a warning on every use.
- The config map entry uses the current `app_config` type. Defaults that
  matched the add-on linter were removed from the config (`host_ipc`,
  `stage`); no behaviour change.
- The image build now needs the Matter Server 1.5.5 base mirrored in the
  ApexOS registry first (handled by the publish workflow).

## 9.1.0

- Initial ApexOS port of the Matter Server add-on (upstream 9.1.0).
- Supervisor wire tokens moved to the ApexOS names (`apexos_api`); upstream
  minimum-Core-version pin dropped (any ApexOS 2.x Core satisfies it).
- `tempio` and `bashio` build artifacts are fetched from the ApexOS org
  mirrors instead of the upstream orgs.
- Matter fabric identity (vendor ID 4939, fabric ID 2) is kept from upstream
  so existing commissioned devices keep working; changing it would force
  recommissioning of every Matter device.
