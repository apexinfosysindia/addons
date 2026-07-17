#!/usr/bin/with-contenv bashio
# shellcheck shell=bash
# ==============================================================================
# Setup persistent user settings
# ==============================================================================
readonly DIRECTORIES=(addon_configs addons backup apexos media share ssl)

# Persist shell history by redirecting .bash_history to /data
if ! bashio::fs.file_exists /data/.bash_history; then
    touch /data/.bash_history
fi
chmod 600 /data/.bash_history

# Make the Supervisor TOKEN available on the CLI
mkdir -p /etc/profile.d
bashio::var.json \
    supervisor_token "${SUPERVISOR_TOKEN}" \
    | tempio \
        -template /usr/share/tempio/apexos.profile \
        -out /etc/profile.d/apexos.sh


# Persist shell profile by redirecting .bash_profile to /data
if ! bashio::fs.file_exists /data/.bash_profile; then
    touch /data/.bash_profile
fi
chmod 600 /data/.bash_profile

# Links some common directories to the user's home folder for convenience
for dir in "${DIRECTORIES[@]}"; do
    ln -s "/${dir}" "${HOME}/${dir}" \
        || bashio::log.warning "Failed linking common directory: ${dir}"
done

# Some links to "old" locations, to match documentation,
# backwards compatibility and muscle memory
ln -s "/apexos" "/config" \
    || bashio::log.warning "Failed linking common directory: /config"
ln -s "/apexos" "${HOME}/config" \
    || bashio::log.warning "Failed linking common directory: ${HOME}/config"
