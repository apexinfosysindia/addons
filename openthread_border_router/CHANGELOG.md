# Changelog

## 3.0.2

- Initial ApexOS port of the OpenThread Border Router add-on (upstream 3.0.2).
- Border-router identity debranded: mDNS `_meshcop._udp` vendor name is now
  "ApexOS" and the service base name "ApexOS OpenThread Border Router " (this
  is what the ApexOS Core Thread integration matches on).
- Supervisor wire tokens moved to the ApexOS names (`apexos_api`); upstream
  minimum-Core-version pin dropped (any ApexOS 2.x Core satisfies it).
- Builds from the ApexOS Debian base image; OTBR itself is still built from
  the pinned upstream openthread/ot-br-posix commits.
