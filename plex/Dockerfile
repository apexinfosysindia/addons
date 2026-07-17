ARG BUILD_FROM
# hadolint ignore=DL3006
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Setup base system
ARG BUILD_ARCH=amd64
ARG PLEX_VERSION=1.43.2.10687-563d026ea

# hadolint ignore=DL3008
RUN \
    echo "deb http://deb.debian.org/debian trixie contrib non-free" \
        >> /etc/apt/sources.list \
    && apt-get update \
    \
    && apt-get install -y --no-install-recommends \
        xmlstarlet>="1.6.1-4" \
        uuid-runtime=2.41-5 \
        unrar=1:7.1.8-1 \
    \
    && if [ "${BUILD_ARCH}" = "aarch64" ]; then ARCH="arm64"; fi \
    && if [ "${BUILD_ARCH}" = "amd64" ]; then ARCH="amd64"; fi \
    \
    && curl -J -L -o /tmp/plexmediaserver.deb \
        "https://downloads.plex.tv/plex-media-server-new/${PLEX_VERSION}/debian/plexmediaserver_${PLEX_VERSION}_${ARCH}.deb" \
    \
    && dpkg --install /tmp/plexmediaserver.deb \
    \
    && apt-get -y clean \
    && rm -fr \
        /tmp/* \
        /var/{cache,log}/* \
        /var/lib/apt/lists/*

# Copy root filesystem
COPY rootfs /
