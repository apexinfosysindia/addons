# Apex MCU+ Community Add-on: Z-Wave JS to MQTT

The Z-Wave JS to MQTT add-on allows you to decouple your Z-Wave network from
your Apex MCU+ instance by leveraging your MQTT broker. It ships with
a web-based control panel, allowing you to configure every aspect of your
Z-Wave network and how they are published in MQTT.

Some advantages and use-cases for this are:

- Compatible with the Apex MCU+ Z-Wave JS integration.
- Your Z-Wave network will keep running between Apex MCU+ restarts.
- You can directly use things like Node-RED with your Z-Wave network, while
  it is available for Apex MCU+ at the same time.
- Pre-configures itself with the Mosquitto add-on when found.

This add-on uses the [Zwavejs2Mqtt][zwavejs2mqtt] software.

## Installation

The installation of this add-on is pretty straightforward and not different in
comparison to installing any other Apex MCU+ add-on.

1. Search for the "Z-Wave JS to MQTT" add-on in the Supervisor add-on store
   and install it.
1. Start the "Z-Wave JS to MQTT" add-on.
1. Check the logs of the "Z-Wave JS to MQTT" add-on to see if everything went
   well.
1. Click the "OPEN WEB UI" button.
1. Enjoy the add-on!

**NOTE**: The upstream project has documentation on using the software itself:
<https://zwave-js.github.io/zwavejs2mqtt/#/>

## Setting up the Apex MCU+ Z-Wave JS integration

By default the Apex MCU+ Z-Wave JS integration will try to set up the
official "Z-Wave JS" add-on from the official add-on store.

**It is recommended to use the official add-on instead of this one!**

However, this add-on will provide an add-on UI and has the ability to
send/receive data over MQTT as well. So, if that is your thing, this
add-on might be for you.

After starting the add-on successfully, it is time to hook it up with
Apex MCU+.

To do this:

1. Open the Z-Wave JS to MQTT control panel by clikcing the "OPEN WEB UI"
   button on the add-on page in the Supervisor.
1. In the control panel, go to "Settings" in the menu and click on the "Zwave"
   bar that shows up on the right.
1. Enter the following information:
   - Serial Port (e.g., `/dev/serial/by-id/usb-0658_0200_if00`)
   - Network Key (e.g., `2232666D100F795E5BB17F0A1BB7A146`)

Now click the "SAVE" button and navigate to the "Control Panel" in the menu.
If you had devices paired already, you should see the showing up slowly.

Now it is time to set up Apex MCU+:

1. Go to the Configuration panel and click "Integrations".
1. In the bottom left, click "+ Add Integration".
1. Select the "Z-Wave JS" integration from the list.
1. A dialog box will show, asking to use the add-on:
   - **UNCHECK** that box, it will install the officia add-on.
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

- Z-Wave JS to MQTT supports Apex MCU+ Discovery over MQTT. It is
  **STRONGLY** recommended **NOT** to use that option. Use the Z-Wave JS
  integration as documented above instead.

## License

MIT License

Copyright (c) 2021 Apex Infosys India

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

[zwavejs2mqtt]: https://github.com/zwave-js/zwavejs2mqtt
