# ApexOS App: openWakeWord

## Installation

Follow these steps to get the app (formerly known as add-on) installed on your system:

1. In ApexOS, go to **Settings** > **Apps** > **Install app**.
2. Find the "openWakeWord" app and click it.
3. Click on the "INSTALL" button.

## How to use

After this app is installed and running, it will be automatically discovered
by the Wyoming integration in ApexOS. To finish the setup, open
[the Wyoming setup shortcut](https://my.apexinfosys.in/redirect/config_flow_start/?domain=wyoming).

Alternatively, you can install the Wyoming integration manually: in ApexOS, go
to **Settings** > **Devices & services** > **Add integration** and choose
"Wyoming Protocol".

## Configuration

### Option: `threshold`

Activation threshold (0-1), where higher means fewer activations.  See trigger
level for the relationship between activations and wake word detections.

### Option: `trigger_level`

Number of activations before a detection is registered. A higher trigger level
means fewer detections.

### Option: `debug_logging`

Enable debug logging. Useful for seeing satellite connections and each wake word detection in the logs.

## Custom Wake Word Models

The app will automatically load custom wake word models from the `/share/openwakeword` directory. Install the Samba share app to copy wake word model files (`*.tflite`) to this directory.

After adding new models to `/share/openwakeword`, make sure to reload any Wyoming integrations for openWakeWord. Once reloaded, the new wake words will be available to select in the Voice Assistants settings page.

## Support

Got questions or found a bug? Reach the ApexOS team at
[support@apexinfosys.in](mailto:support@apexinfosys.in) or open an issue on
[GitHub](https://github.com/apexinfosysindia/addons/issues).
