# Apex Connect+ Add-on: Node-RED

[Node-RED][nodered] is a programming tool for wiring together hardware devices,
APIs and online services in new and interesting ways.

It provides a browser-based editor that makes it easy to wire together flows
using the wide range of nodes in the palette that can be deployed to its
runtime in a single click.

## Installation

The installation of this add-on is pretty straightforward and not different in
comparison to installing any other Apex Connect+ add-on.

1. Click the "Install" button to install the add-on.
1. Start the "Node-RED" add-on.
1. Check the logs of "Node-RED" to see if everything went well.
1. Click on the "OPEN WEB UI" button to jump into Node-RED.
1. The add-on works straight out the box! No need to configure a server!

**Note**: The add-on is **pre-configured** out of the box! There is no need
to add/change/update the server connection settings!

## Configuration

**Note**: _Remember to restart the add-on when the configuration is changed._

Example add-on configuration:

```yaml
log_level: info
http_node:
  username: MarryPoppins
  password: Supercalifragilisticexpialidocious
http_static:
  username: MarryPoppins
  password: Supercalifragilisticexpialidocious
ssl: true
certfile: fullchain.pem
keyfile: privkey.pem
system_packages:
  - ffmpeg
npm_packages:
  - node-red-admin
init_commands:
  - echo 'This is a test'
  - echo 'So is this...'
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

### Option: `ssl`

Enables/Disables SSL (HTTPS) on the web interface.
Set it `true` to enable it, `false` otherwise.

**Note**: _The SSL settings only apply to direct access and has no effect
on the Ingress service._

### Option: `certfile`

The certificate file to use for SSL.

**Note**: _The file MUST be stored in `/ssl/`, which is the default_

### Option: `keyfile`

The private key file to use for SSL.

**Note**: _The file MUST be stored in `/ssl/`, which is the default_

### Option: `credential_secret`

Credentials are encrypted by Node-RED in storage, using a secret key.
This option allows you to specify your secret key. This can be anything
you like, it is just like a password. Be sure to store it somewhere safe.
You might need it in the future! (e.g., When restoring a backup).

**Note**: _Once you set this property, do not change it - doing so will prevent
Node-RED from being able to decrypt your existing credentials and they will be
lost._

**Note**: _If you have manually enabled the use of project in Node-RED, this
option will, eventhough required, be ignored by Node-RED._

### Option: `theme`

Sets one of the Node-RED themes. Currently available options:

- `default`
- `aurora`
- `cobalt2`
- `dark`
- `dracula`
- `espresso-libre`
- `github-dark`
- `github-dark-default`
- `github-dark-dimmed`
- `midnight-red`
- `monoindustrial`
- `monokai`
- `monokai-dimmed`
- `noctis`
- `oceanic-next`
- `oled`
- `one-dark-pro`
- `one-dark-pro-darker`
- `solarized-dark`
- `solarized-light`
- `tokyo-night`
- `tokyo-night-light`
- `tokyo-night-storm`
- `totallyinformation`
- `zenburn`

### Option: `http_node`

To password protect the node-defined HTTP endpoints (`httpNodeRoot`),
the following properties can be used:

- `username`
- `password`

**Note**: _In order to use the `http_node` you will need to expose Node-RED using
a network port in addition to ingress. The HTTP nodes will also be presented
under `/endpoint/` as shown in the UI. If using the `node-red-dashboard` module
this will also be hosted under this path and will use any credentials set here._

### Option: `http_static`

To password protect the static content (httpStatic), the following
properties can be used:

- `username`
- `password`

### Option: `system_packages`

Allows you to specify additional [Alpine packages][alpine-packages] to be
installed to your Node-RED setup (e.g., `g++`. `make`, `ffmpeg`).

**Note**: _Adding many packages will result in a longer start-up time
for the add-on._

### Option: `npm_packages`

Allows you to specify additional [NPM packages][npm-packages] or
[Node-RED nodes][node-red-nodes] to be installed to your Node-RED setup
(e.g., `node-red-dashboard`, `node-red-contrib-ccu`).

**Note**: _Adding many packages will result in a longer start-up time
for the add-on._

### Option: `init_commands`

Customize your Node-RED environment even more with the `init_commands` option.
Add one or more shell commands to the list, and they will be executed every
single time this add-on starts.

### Option: `safe_mode`

Setting this option to `true` will start Node-Red with the `--safe` flag set,
starting the application without starting any flows for troubleshooting.

### Option: `leave_front_door_open`

Adding this option to the add-on configuration allows you to disable
authentication on the add-on by setting it to `true` and leaving the
username and password empty.

**Note**: _We STRONGLY suggest, not to use this, even if this add-on is
only exposed to your internal network. USE AT YOUR OWN RISK!_

### Option: `max_old_space_size`

Sets the max memory size (in MB) of nodeJS V8's old memory section.
As memory consumption approaches the limit, V8 will spend more time
on garbage collection in an effort to free unused memory.

<https://nodejs.org/api/cli.html#--max-old-space-sizesize-in-megabytes>

## Configuration folder

The addon will store most of its configuration in the Node-RED add-on
configuration folder, including the `flows.json`.

## Time zone configuration

The addon will use the configured time zone of the underlying operating system.
If this is incorrect (for example with the Apex Connect+ Operating System it
will be UTC), this can be configured in the `settings.js` file.

To do so, open the file with a text editor and add the following above the
`module.exports = {` line.

`process.env.TZ = "America/Toronto";`

The time zone will need to reflect your environment.

Save the file and restart the Node-RED add-on.

## Known issues and limitations

- While this add-on ships with Node-RED Dashboard, it currently does not
  support accessing the dashboard via Ingress. This is a technical limitation
  on the Node-RED Dashboard end.

- If you cannot access HTTP nodes or Node-RED Dashboard, please check
  if you have enabled direct access mode by setting a port number in
  "Network" configuration section of the add-on.

- If you cannot access HTTP nodes or Node-RED Dashboard, please check
  if you URL starts with `/endpoint/`, or else Apex Connect+ authentication
  will kick in.

- If the following error is seen after an update:
  `WARNING (MainThread) [hassio.api.proxy] Unauthorized WebSocket access!`.
  Please validate the configuration of the Apex Connect+ server setup in
  Node-RED. This can be found by double-clicking any Apex Connect+ node and
  selecting the pencil icon by the server name. The checkbox that states
  `I use the Apex Connect+ Add-On` should be checked.

## Changelog & Releases

This repository keeps a change log using [GitHub's releases][releases]
functionality. The format of the log is based on
[Keep a Changelog][keepchangelog].

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

Copyright (c) 2018-2024 Franck Nijhof

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
