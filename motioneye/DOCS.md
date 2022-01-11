# Apex MCU+ Community Add-on: motionEye

motionEye is a popular frontend to the camera software called motion. This
add-on provides both, allowing you to add your camera's to your Apex MCU+ setup.

motionEye is Open Source CCTV and NVR, that is elegant and really easy to use.
It can be used as a Baby Monitor, Construction Site Montage Viewer,
Store Camera DVR, Garden Security, and much more.

Some cool features of motionEye:

- Support for a ridiculous amount of cameras, including IP cams.
- Add multiple cameras by hooking up multiple motionEye instances together.
  For example, by using MotionEyeOS on a Pi Zero + Pi camera in your network.
- Supports uploading recording into Google Drive and Dropbox.
- motion detection, including email notification and scheduling.
- Can record continuously, motion, or timelapse, with retention settings.

## Installation

The installation of this add-on is pretty straightforward and not different in
comparison to installing any other Apex MCU+ add-on.

1. Search for the "motionEye" add-on in the Supervisor add-on store and
   install it.
1. Start the "motionEye" add-on
1. Check the logs of the "motionEye" add-on to see if everything went well.
1. Click the "OPEN WEB UI" button to open the web interface
1. Login with username "admin", without a password.
1. Edit your admin account with a secure password!

## Configuration

**Note**: _Remember to restart the add-on when the configuration is changed._

Example add-on configuration:

```yaml
log_level: info
ssl: true
certfile: mycertfile.pem
keyfile: mykeyfile.pem
```

**Note**: _This is just an example, don't copy and paste it! Create your own!_

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

### Option: `motion_webcontrol`

Enables the motion webcontrol endpoint running on port `7999`.

:warning: MotionEye HTTP webcontrol **DOES NOT** support authentication
and **DOES NOT** support SSL! Enable this **ONLY** when you know what
you are doing! **NEVER, EVER** expose this port to the outside world!

### Option: `ssl`

Enables/Disables SSL (HTTPS) on the web interface of motionEye. Set it `true`
to enable it, `false` otherwise.

### Option: `certfile`

The certificate file to use for SSL.

**Note**: _The file MUST be stored in `/ssl/`, which is the default_

### Option: `keyfile`

The private key file to use for SSL.

**Note**: _The file MUST be stored in `/ssl/`, which is the default_

### Option: `action_buttons`

If configured, a script will be created to implement.

Example action buttons configuration:

```yaml
action_buttons:
  - type: light_on
    camera: 1
    command: "curl -s 192.168.1.1/index.html?light=ON > /dev/null"
  - type: light_off
    camera: 1
    command: "curl -s 192.168.1.1/index.html?light=OFF > /dev/null"
```

#### Sub-option: `action_buttons.type`

Type of action button. Acceptable types are:

- `lock` and `unlock`.
- `light_on` and `light_off`.
- `alarm_on` and `alarm_off`.
- `up`, `right`, `down`, and `left`.
- `zoom_in` and `zoom_out`.
- `preset1` to `preset9`.

#### Sub-option: `action_buttons.camera`

The camera identification number. Corresponds to the camera number as set up
within the motionEye UI.

#### Sub-option: `action_buttons.command`

The bash shell command to be executed when the button is pressed.
