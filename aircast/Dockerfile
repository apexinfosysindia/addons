ARG BUILD_FROM
# hadolint ignore=DL3006
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Copy root filesystem
COPY rootfs /

# Setup base
ARG BUILD_ARCH=amd64
ARG AIRCAST_VERSION="1.9.3"
RUN \
    apt-get update \
    && apt-get install -y --no-install-recommends \
        unzip=6.0-29 \
    \
    && curl -J -L -o /tmp/airconnect.zip \
      "https://github.com/philippe44/AirConnect/releases/download/${AIRCAST_VERSION}/AirConnect-${AIRCAST_VERSION}.zip" \
    && unzip -d /tmp /tmp/airconnect.zip \
    \
    && if [ "${BUILD_ARCH}" = "aarch64" ]; then AIRCONNECT_ARCH="aarch64"; \
    elif [ "${BUILD_ARCH}" = "amd64" ]; then AIRCONNECT_ARCH="x86_64"; fi \
    \
    && cp "/tmp/aircast-linux-${AIRCONNECT_ARCH}-static" /usr/bin/aircast \
    && chmod a+x /usr/bin/aircast \
    \
    && apt-get purge -y --auto-remove \
        unzip \
    && rm -fr \
        /tmp/* \
        /var/{cache,log}/* \
        /var/lib/apt/lists/*
