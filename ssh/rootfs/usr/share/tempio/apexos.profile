#!/usr/bin/env bash
export PS1="\[\e[0;32m\][\h \W]\$ \[\e[m\]"
export SUPERVISOR_TOKEN={{ .supervisor_token }}

apex banner
# shellcheck disable=SC1090
source <(apex completion bash)
