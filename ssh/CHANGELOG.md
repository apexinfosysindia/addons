# Changelog

## 10.3.0

- Initial ApexOS port of the Terminal & SSH add-on (upstream 10.3.0).
- Bundles the ApexOS CLI (`apex`) copied from the ApexOS CLI container image
  (multi-stage build) instead of downloading the upstream CLI release binary.
- Configuration directory is mounted at `/apexos`
  (with `/config` compatibility symlink).
- Web terminal tmux session renamed to `apexos`; the deprecated legacy CLI
  wrapper script was dropped.
- Builds locally from the ApexOS base image.
