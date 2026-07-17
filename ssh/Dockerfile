ARG BUILD_FROM
ARG BUILD_ARCH
ARG CLI_IMAGE_TAG=dev

# ApexOS CLI is distributed as a container image; stage it for the binary copy
FROM registry.apexinfosys.in/apexos/${BUILD_ARCH}-apexos-cli:${CLI_IMAGE_TAG} AS cli

FROM $BUILD_FROM

# Setup base
RUN \
    set -x \
    && apk add --no-cache \
        bash-completion \
        pulseaudio-utils \
        alsa-plugins-pulse \
        bluez \
        git \
        libuv \
        mosquitto-clients \
        nano \
        openssh \
        pwgen \
        tmux \
        ttyd \
        vim

# Add YAML highlighting for nano
ADD https://raw.githubusercontent.com/scopatz/nanorc/master/yaml.nanorc /usr/share/nano/yaml.nanorc
RUN sed -i 's/^#[[:space:]]*\(include "\/usr\/share\/nano\/\*\.nanorc".*\)/\1/' /etc/nanorc

# Use bash as default shell
RUN sed -i "s|/bin/sh|/bin/bash|" /etc/passwd

# ApexOS CLI (apex)
COPY --from=cli /usr/bin/apex /usr/bin/apex
RUN chmod a+x /usr/bin/apex \
    && /usr/bin/apex completion > /usr/share/bash-completion/completions/apex

# Copy data
COPY rootfs /
