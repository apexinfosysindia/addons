# Apex Connect+ Add-on: Z-Wave JS UI

The Z-Wave JS UI add-on provides an additional control panel, allowing you
to configure every aspect of your Z-Wave network. It provides a decoupled
gateway which can communicate using Z-Wave JS WebSockets (used by the
Apex Connect+ Z-Wave JS integration) and MQTT (even simultaneously).

Some advantages and use-cases:

- Compatible with the Apex Connect+ Z-Wave JS integration.
- Your Z-Wave network will keep running between Apex Connect+ restarts.
- You can directly use things like Node-RED with your Z-Wave network, while
  it is available for Apex Connect+ at the same time.
- Allow [ESPHome.io][esphome] based ESP devices to directly respond or work
  with your Z-Wave network.
- Pre-configures itself with the Mosquitto add-on when found.

This add-on uses the [Z-Wave JS UI][zwave-js-ui] software.

## Installation

The installation of this add-on is pretty straightforward and not different in
comparison to installing any other Apex Connect+ add-on.

1. Click the "Install" button to install the add-on.
1. Check the logs of the "Z-Wave JS UI" add-on to see if everything went
   well.
1. Click the "OPEN WEB UI" button.
1. Enjoy the add-on!

**NOTE**: The upstream project has documentation on using the software itself:
<https://zwave-js.github.io/zwave-js-ui/#/>

## Setting up the Apex Connect+ Z-Wave JS integration

By default the Apex Connect+ Z-Wave JS integration will try to set up the
official "Z-Wave JS" add-on from the official add-on store.

However, this add-on will provide an add-on UI and has the ability to
send/receive data over MQTT as well. So, if that is your thing, this
add-on might be for you.

After starting the add-on successfully, it is time to hook it up with
Apex Connect+.

To do this:

1. Open the Z-Wave JS UI control panel by clicking the "OPEN WEB UI"
   button on the add-on page in the Supervisor.
1. In the control panel, go to "Settings" in the menu and click on the "Zwave"
   bar that shows up on the right.
1. Enter the following information:
   - Serial Port (e.g., `/dev/serial/by-id/usb-0658_0200_if00`)
   - Network Key (e.g., `2232666D100F795E5BB17F0A1BB7A146`)

Now click the "SAVE" button and navigate to the "Control Panel" in the menu.
If you had devices paired already, you should see the showing up slowly.

Now it is time to set up Apex Connect+:

1. Go to the Settings panel and click "Devices & Services".
1. In the bottom right, click "+ Add Integration".
1. Select the "Z-Wave" integration from the list.
1. A dialog box will show, asking to use the add-on:
   - **UNCHECK** that box, it will install the official add-on.
   - Again, the official add-on is recommended, so...
1. In the next dialog it will ask for the server. Enter:
   `ws://a0d7b954-zwavejs2mqtt:3000`
1. Confirm and done!

## Configuration

**Note**: _Remember to restart the add-on when the configuration is changed._

Example add-on configuration:

```yaml
log_level: info
```

### Option: `log_level`

The `log_level` option controls the level of log output by the addon and can
be changed to be more or less verbose, which might be useful when you are
dealing with an unknown issue. Possible values are:

- `trace`: Show every detail, like all called internal functions.
- `debug`: Shows detailed debug information.
- `info`: Normal (usually) interesting events.
- `warning`: Exceptional occurrences that are not errors.
- `error`: Runtime errors that do not require immediate action.
- `fatal`: Something went terribly wrong. Add-on becomes unusable.

Please note that each level automatically includes log messages from a
more severe level, e.g., `debug` also shows `info` messages. By default,
the `log_level` is set to `info`, which is the recommended setting unless
you are troubleshooting.

## Known issues and limitations

- Z-Wave JS UI supports Apex Connect+ Discovery over MQTT. It is
  **STRONGLY** recommended **NOT** to use that option. Use the Z-Wave JS
  integration as documented above instead.

## Changelog & Releases

This repository keeps a change log using [GitHub's releases][releases]
functionality.

Releases are based on [Semantic Versioning][semver], and use the format
of `MAJOR.MINOR.PATCH`. In a nutshell, the version will be incremented
based on the following:

- `MAJOR`: Incompatible or major changes.
- `MINOR`: Backwards-compatible new features and enhancements.
- `PATCH`: Backwards-compatible bugfixes and package updates.

## Support

You could also [open an issue here][issue] GitHub.

## License

MIT License

Copyright (c) 2021 - 2024 Franck Nijhof

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
