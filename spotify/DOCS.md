# ApexOS App: Spotify Connect

The Spotify Connect app allows you to use your device, running ApexOS,
to play your Spotify music. This app uses the Spotify Connect protocol,
which makes it a device that can be controlled by all the official clients.

For example, running ApexOS on a Raspberry Pi with this app installed will
allow you to play your Spotify music on the Pi. So all you'll have to do is
hook up your sound system to the Pi and start booming!

## Installation

Follow these steps to get the app (formerly known as add-on) installed on your system:

1. In ApexOS, go to **Settings** > **Apps** > **Install app**.
2. Find the "Spotify Connect" app and click it.
3. Click on the "INSTALL" button.
4. Select your audio output device and hit `Save` on that as well.
5. Start the "Spotify Connect" app.
6. Check the logs of the "Spotify Connect" app to see if everything went well.
7. Ready to go!

## Configuration

**Note**: _Remember to restart the app when the configuration is changed._

Example app configuration:

```yaml
log_level: info
name: ApexOS
bitrate: 320
initial_volume: 50
autoplay: true
```

**Note**: _This is just an example, don't copy and paste it! Create your own!_

### Option: `log_level`

The `log_level` option controls the level of log output by the app and can
be changed to be more or less verbose, which might be useful when you are
dealing with an unknown issue. Possible values are:

- `trace`: Show every detail, like all called internal functions.
- `debug`: Shows detailed debug information.
- `info`: Normal (usually) interesting events.
- `warning`: Exceptional occurrences that are not errors.
- `error`: Runtime errors that do not require immediate action.
- `fatal`: Something went terribly wrong. App becomes unusable.

Please note that each level automatically includes log messages from a
more severe level, e.g., `debug` also shows `info` messages. By default,
the `log_level` is set to `info`, which is the recommended setting unless
you are troubleshooting.

Setting the `log_level` to `debug` will also turn on debug mode on
librespot.

### Option: `name`

The name of your device (the Spotify Connect target), as shown on
the official Spotify clients.

### Option: `bitrate`

The bitrate Spotify should use. The higher, the better the sound quality,
however, the app consumes more data.

Valid values: `96`, `160` (default) or `320`.

### Option: `initial_volume`

Initial volume in % from 0-100. This setting takes effect when the app starts or
recovers from a crash.

### Option: `autoplay`

Whether Spotify should autoplay similar songs when reaching the end of the queue.

## Known issues and limitations

- This app requires a Spotify Premium account.

## Support

Got questions or found a bug? Reach the ApexOS team at
[support@apexinfosys.in](mailto:support@apexinfosys.in) or open an issue on
[GitHub](https://github.com/apexinfosysindia/addons/issues).
