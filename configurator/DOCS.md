# ApexOS App: File editor

## Installation

Follow these steps to get the app (formerly known as add-on) installed on your system:

1. In ApexOS, go to **Settings** > **Apps** > **Install app**.
2. Find the "File editor" app and click it.
3. Click on the "INSTALL" button.

## How to use

In general, this app requires no configuration from your end.

1. Toggle the "Show in sidebar" option, which adds the File editor to the main menu.
2. Start the app.
3. Refresh your browser, the "File editor" is now visible in the sidebar.
4. Click on the "File editor" menu option and start configuring!

## Configuration

App configuration:

```yaml
dirsfirst: false
enforce_basepath: false
git: true
ignore_pattern:
  - __pycache__
ssh_keys: []
```

### Option: `dirsfirst` (required)

This option allows you to list directories before files in the file browser tree.

Set it to `true` to list directories first, `false` otherwise.

### Option: `enforce_basepath` (required)

If set to `true`, access is limited to files within the `/apexos` directory
(also known as the `/config` folder inside ApexOS itself).

### Option: `git` (required)

If set to `true`, the app will initialize git for directories that support it.

### Option: `ignore_pattern` (required)

This option allows you to hide files and folders from the file browser tree.
By default, it hides the `__pycache__` folders.

### Option: `ssh_keys` (required)

A list of filenames containing SSH private keys. These can be used to allow for access to remote git repositories.

## Known issues and limitations

- This app can only be used via Ingress and has no direct access.

## Support

Got questions or found a bug? Reach the ApexOS team at
[support@apexinfosys.in](mailto:support@apexinfosys.in) or open an issue on
[GitHub](https://github.com/apexinfosysindia/addons/issues).
