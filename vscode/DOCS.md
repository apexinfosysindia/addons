# ApexOS App: Studio Code Server

This app runs [code-server](https://github.com/coder/code-server), which
gives you a Visual Studio Code experience straight from the browser. It allows
you to edit your ApexOS configuration directly from your web browser,
directly from within the ApexOS frontend.

The app has YAML, ESPHome, MDI icons and configuration auto-completion
extensions pre-installed and pre-configured right out of the box. This means
that auto-completion works instantly, without the need for configuring
anything.

## Installation

Follow these steps to get the app (formerly known as add-on) installed on your system:

1. In ApexOS, go to **Settings** > **Apps** > **Install app**.
2. Find the "Studio Code Server" app and click it.
3. Click on the "INSTALL" button.
4. Start the "Studio Code Server" app.
5. Check the logs of the "Studio Code Server" app to see if everything went
   well.
6. Click the "OPEN WEB UI" button to open Studio Code Server.

## Configuration

**Note**: _Remember to restart the app when the configuration is changed._

Example app configuration:

```yaml
log_level: info
config_path: /share/my_path
packages:
  - mariadb-client
init_commands:
  - ls -la
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

### Option: `config_path`

This option allows you to override the default path the app will open
when accessing the web interface. For example, use a different
configuration directory like `/share/myconfig` instead of `/config`. If set
to `/root` then all the common folders of ApexOS such as `/config`, `/ssl`,
`/share`, etc. will appear as subfolders for each access.

When not configured, the app will automatically use the default: `/config`

### Option: `packages`

Allows you to specify additional [Debian packages][debian-packages] to be
installed in your shell environment (e.g., Python, PHP, Go).

**Note**: _Adding many packages will result in a longer start-up
time for the app._

### Option: `init_commands`

Customize your VSCode environment even more with the `init_commands` option.
Add one or more shell commands to the list, and they will be executed every
single time this app starts.

## Resetting your VSCode settings to the app defaults

The app updates your settings to be optimized for use with ApexOS.
As soon as you change a setting, the app will stop doing that since it
might be destructive. However, in case you changed some things, but want to
return to the defaults as delivered by this app, do the following:

1. Open the Visual Studio Code editor.
1. Click on `Terminal` in the top menu bar and click on `New Terminal`.
1. Execute the following command in the terminal window: `reset-settings`.
1. Done!

## Known issues and limitations

- Can this app run on a Raspberry Pi? Yes, but only if you run a 64 bits
  operating system. Also, see point below.
- This app currently only supports AMD64 and aarch64/ARM64 machines.
  Although we support ARM devices, please be aware, that this app is quite
  heavy to run, and requires quite a bit of RAM. We do not recommended to run
  it on devices with less than 4Gb of memory.
- **Do not use the root directory (`/`) as your workspace.** Opening the root
  directory causes severe performance issues, as VS Code will attempt to index
  the entire filesystem, resulting in excessive CPU and memory usage. Always
  use `/config` (the default) or another specific directory. The app will
  prevent startup if the root directory is configured as the workspace.
- "Visual Studio Code is unable to watch for file changes in this large
  workspace" (error ENOSPC)

  This issue is caused by your system not having enough file handles,
  which causes VSCode to be unable to watch all your files. For ApexOS,
  currently the only option is to click on the little cog when the
  notification appears and tell it to not show again. In case you have
  a generic Linux setup (e.g., Ubuntu), follow this guide by Microsoft:

  <https://code.visualstudio.com/docs/setup/linux#_visual-studio-code-is-unable-to-watch-for-file-changes-in-this-large-workspace-error-enospc>

## Support

Got questions or found a bug? Reach the ApexOS team at
[support@apexinfosys.in](mailto:support@apexinfosys.in) or open an issue on
[GitHub](https://github.com/apexinfosysindia/addons/issues).

[debian-packages]: https://packages.debian.org
