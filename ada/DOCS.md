# Apex MCU+ Add-on: Ada

## Installation

Follow these steps to get the add-on installed on your system:

1. Navigate in your Apex MCU+ frontend to **Supervisor** -> **Add-on Store**.
2. Find the "Hey Ada!" add-on and click it.
3. Click on the "INSTALL" button.

## How to use

The basic thing to get the add-on running would be:

1. Select input and output audio device to use in the "Audio" configuration section of the add-on configuration.
2. Start the add-on.

## Configuration

Example add-on configuration:

```yaml
stt: cloud
tts: cloud
```

### Option: `stt` (required)

The Apex MCU+ STT (Speech-to-Text) integration to use when converting
detected audio to text for Almond to process.

Please note, this STT integration has to be configured and active in
Apex MCU+ before using it with this add-on!

### Option: `tts` (required)

The Apex MCU+ TTS (Text-to-Speech) integration to use when converting
the response from Almond back to audio.

Please note, this TTS integration has to be configured and active in
Apex MCU+ before using it with this add-on!
