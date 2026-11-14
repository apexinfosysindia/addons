# Changelog

## 2.5.2

Tracks upstream 2.5.2 (covers 2.3.2 to 2.5.2).

- Piper TTS service updated to `wyoming-piper` 2.5.2.
- New voice management web interface (the add-on's "Open Web UI" button, via
  ingress): upload and delete custom Piper voices and upload OmniVoice cloning
  voices without file access to `/share`. Only the ingress proxy is allowed to
  reach it.
- New `backend` option: `piper` (default) or the experimental `omnivoice`
  backend (higher quality, voice cloning, much slower; wants a desktop or server
  CPU) with an `omnivoice_steps` quality/speed option.
- New `enable_japanese` and `enable_thai` options. Their voices are hidden
  until the option is on (they used to be offered and then produce silence).
  The extra Python packages for Japanese, Thai and OmniVoice are installed at
  start-up into a cache in `/data` instead of being baked into the image, which
  keeps the image about as small as before.
- A voice that fails to synthesize now reports why instead of returning empty
  audio; an interrupted voice download is retried on the next start.
- Voice models are included in backups again (uploaded voices exist nowhere
  else); only the OmniVoice weights, the model cache and the package cache are
  excluded.
- Health check is now a Wyoming Describe/Info round trip, which also works with
  the OmniVoice backend.
- New voices: Italian (serena, high and medium), Bengali, Czech (kasandra),
  Hebrew, Armenian, Japanese, Korean, Marathi, Urdu (aegis_female), Thai
  (tsync2) and Estonian (news).
- ONNX Runtime telemetry is switched off.
- Base image moved to Debian trixie-2026.08.0 (it was already trixie).
- Not included: upstream commits made after the 2.5.2 release tag
  (`wyoming-piper` 2.5.3, streamed voice uploads), which are not part of any
  published upstream version yet.

## 2.3.1

- Initial ApexOS port of the Piper add-on (upstream 2.3.1).
- Builds locally from the ApexOS Debian base image.
- Wyoming discovery announces to ApexOS core.
