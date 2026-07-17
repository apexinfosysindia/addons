# ApexOS App: Plex Media Server

The plex app brings your favorite media together in one place, making it
beautiful and easy to enjoy. The Plex Media Server provided by this app,
organizes your personal video, music, and photo collections
and streams them to all of your devices.

## Installation

Follow these steps to get the app (formerly known as add-on) installed on your system:

1. In ApexOS, go to **Settings** > **Apps** > **Install app**.
2. Find the "Plex Media Server" app and click it.
3. Click on the "INSTALL" button.
4. Surf to <https://www.plex.tv/claim> and get your claim token.
5. Update the app config with the claim code you've got in the previous step.
6. Save the app configuration.
7. Start the "Plex Media Server" app.
8. Check the logs of the "Plex Media Server" to see if everything went well.
9. Login to the Plex admin interface and complete the setup process.

**NOTE**: When adding media locations, please use `/share` and `/media`
as the base directories.

## Configuration

**Note**: _Remember to restart the app when the configuration is changed._

Example app configuration:

```yaml
log_level: info
claim_code: claim-ExAmPlEcOdE12345678
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

### Option: `claim_code`

To allow your server to sign-in to your Plex account, it needs a so-called
"Claim Code". Sign-ing into Plex allows Plex to locate and connect to
your server and unlocks all kinds of features as well.

In order to get your code surf to <https://www.plex.tv/claim>.

This code is only used once by the app. As soon as the
server is successfully authenticated with Plex, the code may be removed.

## Solving connection issues with Plex

Plex is pretty straightforward and pretty easy to set up. Most of the
settings are detected automatically. Nevertheless, it fails to recognize
its IP on your home network. This may cause connection issues with some
Plex apps, e.g., the Samsung Tizen Plex app.

This is not Plex its fault but is because of the Docker ecosystem, in
which this app runs. Luckily, there is an option in Plex to help
with that, but it is a little hidden.

- Login to the Plex web interface.
- Goto setting.
- Click the server tab.
- On the left side, choose "Network".
- Be sure you are looking at the advanced view.
  There is a button "Show Advanced" in the top right.
- Add your custom URLs to "Custom server access URLs" field.

The custom URLs are additional URLs Plex clients will use to try to connect
to Plex. You can list multiple if you'd like, separated by a comma.

Example:

```txt
http://apexos.local:32400,http://192.168.1.88:32400,http://mydomain.duckdns.org:32400
```

## Known issues and limitations

- This app will be able to run on a Raspberry Pi. While it still can be
  useful, don't expect too much. In general, the Pi lacks the processing power
  and is probably not able to stream your media; therefore it is not
  recommended using this app on such a device.
- This app cannot add/mount any additional USB or other devices for you.
  This is an ApexOS limitation. In case you'd like to use extra devices,
  you'll have to modify the host system yourself; this is not supported by
  the ApexOS team.
- A Plex Pass gives you exclusive access to new features, which are
  available through a Beta version channel of the media server. At this
  time, running this "Beta" version, is not supported by this app.
- This app does not support Plex over DLNA.

## Support

Got questions or found a bug? Reach the ApexOS team at
[support@apexinfosys.in](mailto:support@apexinfosys.in) or open an issue on
[GitHub](https://github.com/apexinfosysindia/addons/issues).
