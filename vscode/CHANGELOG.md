# Changelog

## 6.1.1

- ApexOS Config Helper 2.2.1: connect prompts, URL validation messages
  and schema hover examples now show the native web port (1702).

## 6.1.0

- The YAML editing extension is now ApexOS Config Helper (built from the
  org `config-helper` repository, installed from its release asset):
  `apexos` language id and editor settings, native `APEX_SERVER`/
  `APEX_TOKEN` environment (legacy names still honored by the extension),
  telemetry removed. Persisted copies of the previous extension are
  cleaned up on first start.

## 6.0.1

- Initial ApexOS port of the Studio Code Server add-on (upstream 6.0.1,
  bundling code-server 4.107.0).
- The CLI inside the terminal is now the ApexOS `apex` CLI.
- The old configuration location convenience symlink is now `/apexos`
  (pointing at `/config`).
- Builds locally from the ApexOS Debian base image.
