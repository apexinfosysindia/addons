# Apex MCU+ SSH Tunnel

https://apexinfosys.in

## Cloud Integration
This integration creates both Public & Private SSH keys, and uses it to connect to to the given instance on the Apex MCU+ server. The public key can be found in the log after the first startup.

Remember to set `GatewayPorts clientspecified` in sshd-config if you
would like to open ports on other interfaces than localhost.

**IMPORTANT**: If you set `GatewayPorts yes`, all forwarded ports will
listen on all interfaces, `0.0.0.0`. `GatewayPorts clientspecified`
is preferable.

### Licence
MIT (c) Apex Infosys India
