# ApexOS App: Speech to phrase

## Installation

Follow these steps to get the app (formerly known as add-on) installed on your system:

1. In ApexOS, go to **Settings** > **Apps** > **Install app**.
2. Find the "Speech to phrase" app and click it.
3. Click on the "INSTALL" button.

## How to use

After this app is installed and running, it should automatically train itself based on your exposed entities, areas, floors, and sentence triggers (exposed entities are managed in ApexOS under **Settings** > **Voice assistants** > **Expose**).
The app will automatically re-train if necessary.

The app will be automatically discovered by the Wyoming integration in ApexOS. To finish the setup, open
[the Wyoming setup shortcut](https://my.apexinfosys.in/redirect/config_flow_start/?domain=wyoming).

Alternatively, you can install the Wyoming integration manually: in ApexOS, go
to **Settings** > **Devices & services** > **Add integration** and choose
"Wyoming Protocol".

### Voice commands

See [available voice commands](https://github.com/OHF-Voice/speech-to-phrase/blob/main/SENTENCES.md)

### Custom sentences

You can add [custom sentences][] to `/share/speech-to-phrase/custom_sentences/<language>/sentences.yaml` where `<language>` is:

* `ca` - Catalan
* `cs` - Czech
* `de` - German
* `el` - Greek
* `en` - English
* `es` - Spanish
* `eu` - Basque
* `fa` - Persian/Farsi
* `fi` - Finnish
* `fr` - French
* `hi` - Hindi
* `it` - Italian
* `mn` - Mongolian
* `nl` - Dutch
* `pl` - Polish
* `pt_PT` - Portuguese
* `ro` - Romanian
* `ru` - Russian
* `sl` - Slovenian
* `sw` - Swahili
* `tr` - Turkish

## Support

Got questions or found a bug? Reach the ApexOS team at
[support@apexinfosys.in](mailto:support@apexinfosys.in) or open an issue on
[GitHub](https://github.com/apexinfosysindia/addons/issues).

[custom sentences]: https://github.com/OHF-voice/speech-to-phrase?tab=readme-ov-file#custom-sentences
