# Changelog

## 9.1.0

- Initial ApexOS port of the Matter Server add-on (upstream 9.1.0).
- Supervisor wire tokens moved to the ApexOS names (`apexos_api`); upstream
  minimum-Core-version pin dropped (any ApexOS 2.x Core satisfies it).
- `tempio` and `bashio` build artifacts are fetched from the ApexOS org
  mirrors instead of the upstream orgs.
- Matter fabric identity (vendor ID 4939, fabric ID 2) is kept from upstream
  so existing commissioned devices keep working; changing it would force
  recommissioning of every Matter device.
