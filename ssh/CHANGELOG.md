# Changelog

## 10.6.0

- Security: rebuilt on an Alpine 3.24 base so the image picks up the OpenSSH
  release that fixes a password-authentication bypass in the SSH server
  (upstream 10.6.0 ships OpenSSH 10.3_p1-r2). It should not be exploitable
  with the default setup of this add-on, even with password authentication
  enabled.
- The web terminal now runs with screen reader mode on.
- The shell home links `local_apps` and `app_configs` replace `addons` and
  `addon_configs`, following the renamed folder mappings.
- Install steps in the docs shortened (the add-on is no longer advanced-mode
  only).
- Builds on the ApexOS base image 3.24-2026.08.0 (Alpine 3.24).
- Tracks upstream 10.6.0 (covers 10.4.0 and 10.5.0). The upstream CLI release
  bump does not apply: the ApexOS CLI is copied from its own image.

## 10.3.0

- Initial ApexOS port of the Terminal & SSH add-on (upstream 10.3.0).
- Bundles the ApexOS CLI (`apex`) copied from the ApexOS CLI container image
  (multi-stage build) instead of downloading the upstream CLI release binary.
- Configuration directory is mounted at `/apexos`
  (with `/config` compatibility symlink).
- Web terminal tmux session renamed to `apexos`; the deprecated legacy CLI
  wrapper script was dropped.
- Builds locally from the ApexOS base image.
