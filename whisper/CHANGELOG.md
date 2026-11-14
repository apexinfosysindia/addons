# Changelog

## 3.5.3

Tracks upstream 3.5.3 (covers 3.5.1 to 3.5.3).

- Shuts down cleanly when the add-on is stopped.
- Leaves the "Starting" state sooner: the health check runs every 5 seconds
  during start-up, then every 30 seconds.
- Speech recognition components updated and pinned to exact versions
  (faster-whisper 1.2.1, ctranslate2 4.8.1, onnxruntime 1.29.0, sherpa-onnx
  1.13.6, funasr 1.4.3, torch 2.7.1); they are installed in a virtual
  environment inside the image.
- ONNX Runtime telemetry is switched off: newer versions send usage data to a
  remote server by default.
- Uses the `app_config` folder mapping.
- Base image moved to Debian trixie-2026.08.0.

## 3.5.0

- Initial ApexOS port of the Whisper add-on (upstream 3.5.0).
- Builds locally from the ApexOS Debian base image.
- Wyoming discovery announces to ApexOS core.
