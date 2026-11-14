# Changelog

## 12.11.0

- The `addons` and `addon_configs` shares are now named `local_apps` and
  `app_configs`. Stored `enabled_shares` values are migrated automatically on
  start, and the old share names stay exposed (pointing at the same
  directories) so existing connections keep working. Connecting to an old
  share name logs a warning naming the share to switch to.
- New option `network_discovery` (default on): turn it off to stop
  advertising the host through Web Services Dynamic Discovery. Shares stay
  reachable by hostname or IP address.
- Uses the `local_apps` and `all_app_configs` folder mappings.
- Clean shutdown: the container exits with code 0 when its services are
  stopped with SIGTERM, so the Supervisor no longer warns on stop or restart.
- The share password is handed to `smbpasswd` with `printf`, and the
  interface list reaches `jq` as a variable (passwords and interface names
  with special characters no longer break start-up).
- Now builds from the ApexOS base image 3.24-2026.08.0 (Alpine 3.24, current
  Samba 4.x packages) instead of the add-on base image, matching what
  upstream builds this add-on from.
- Tracks upstream 12.11.0 (covers upstream 12.9.0 and 12.10.0). Not carried
  over yet: Supervisor-side log timestamps (`log_format`), which the ApexOS
  Supervisor does not provide, so log lines keep their own timestamps; and
  the s6 `user-bundles.d` service layout, which needs a newer base image.

## 12.8.2

- Rebuilt on ApexOS add-on base 19.0.0 (Alpine 3.22). No functional change.

## 12.8.1

- Initial ApexOS port of the Samba share add-on (upstream 12.8.1).
- Config share serves the ApexOS configuration mount (`/apexos`).
- Builds locally from the ApexOS add-on base image.
