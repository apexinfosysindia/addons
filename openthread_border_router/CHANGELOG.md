# Changelog

## 3.4.0

Tracks upstream 3.4.0 (covers 3.1.0 to 3.4.0).

- OpenThread Border Router stable updated to v2026.10.0 (commit cb4bdae2):
  - Routes to external networks announced by other border routers in the
    Thread network are no longer added to the host, which avoids routing
    loops and mesh congestion on networks with several border routers.
    Routes to Thread devices are not affected.
  - Channel changes (pending dataset) are confirmed with the Thread leader
    instead of being applied locally.
  - Thread 1.4 credentials sharing and local QR code generation in the web
    UI, DNS resolution for Thread devices fixed in OpenThread itself, and
    other fixes. The two local patches carried until now (REST socket
    address reuse, NAT64 IPv4 options) are included upstream and dropped.
- Beta updated to v2026.11.0 (commit 76fb21d6): mDNS resolution retry fixes
  and Enhanced Route TLV support in the REST API diagnostics.
- A network-based RCP that is unreachable no longer crashes the add-on: the
  TCP client keeps retrying and only reports ready once connected.
- OpenThread CLI calls during start-up are checked, and failures are logged
  instead of passing silently.
- The add-on now declares the `NET_RAW` network capability explicitly.
- universal-silabs-flasher updated to 0.1.3.
- Builds on the ApexOS Debian base image trixie-2026.08.0.
- Not carried over: log timestamps from the Supervisor (`log_format`), which
  the ApexOS Supervisor does not provide; OpenThread keeps its uptime prefix
  and the add-on scripts keep their timestamps.

## 3.0.2

- Initial ApexOS port of the OpenThread Border Router add-on (upstream 3.0.2).
- Border-router identity debranded: mDNS `_meshcop._udp` vendor name is now
  "ApexOS" and the service base name "ApexOS OpenThread Border Router " (this
  is what the ApexOS Core Thread integration matches on).
- Supervisor wire tokens moved to the ApexOS names (`apexos_api`); upstream
  minimum-Core-version pin dropped (any ApexOS 2.x Core satisfies it).
- Builds from the ApexOS Debian base image; OTBR itself is still built from
  the pinned upstream openthread/ot-br-posix commits.
