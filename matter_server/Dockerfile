ARG BUILD_FROM
FROM ${BUILD_FROM}

# Default ENV
ENV \
    LANG="C.UTF-8" \
    DEBIAN_FRONTEND="noninteractive" \
    CURL_CA_BUNDLE="/etc/ssl/certs/ca-certificates.crt" \
    S6_BEHAVIOUR_IF_STAGE2_FAILS=2 \
    S6_CMD_WAIT_FOR_SERVICES_MAXTIME=0 \
    S6_CMD_WAIT_FOR_SERVICES=1 \
    S6_SERVICES_READYTIME=50

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Build Args
ARG \
    BASHIO_VERSION \
    TEMPIO_VERSION \
    S6_OVERLAY_VERSION

# Base system
WORKDIR /usr/src
ARG BUILD_ARCH

RUN \
    set -x \
    && apt-get update && apt-get install -y --no-install-recommends \
        bash \
        jq \
        tzdata \
        curl \
        ca-certificates \
        xz-utils \
    && mkdir -p /usr/share/man/man1 \
    \
    && if [ "${BUILD_ARCH}" = "armv7" ]; then \
            export S6_ARCH="arm"; \
        elif [ "${BUILD_ARCH}" = "i386" ]; then \
            export S6_ARCH="i686"; \
        elif [ "${BUILD_ARCH}" = "amd64" ]; then \
            export S6_ARCH="x86_64"; \
        else \
            export S6_ARCH="${BUILD_ARCH}"; \
        fi \
    \
    && for part in "${S6_ARCH}" noarch symlinks-arch symlinks-noarch; do \
            curl -L -f --retry 5 --retry-all-errors -o "/tmp/s6-overlay-${part}.tar.xz" \
                "https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-${part}.tar.xz" \
            && tar Jxf "/tmp/s6-overlay-${part}.tar.xz" -C / \
            && rm -f "/tmp/s6-overlay-${part}.tar.xz" \
            || exit 1; \
        done \
    && mkdir -p /etc/fix-attrs.d \
    && mkdir -p /etc/services.d \
    \
    && curl -L -f --retry 5 --retry-all-errors -o /usr/bin/tempio \
        "https://github.com/apexinfosysindia/tempio/releases/download/${TEMPIO_VERSION}/tempio_${BUILD_ARCH}" \
    && chmod a+x /usr/bin/tempio \
    \
    && mkdir -p /usr/src/bashio \
    && curl -L -f --retry 5 --retry-all-errors -o /tmp/bashio.tar.gz \
        "https://github.com/apexinfosysindia/bashio/archive/v${BASHIO_VERSION}.tar.gz" \
    && tar -xzf /tmp/bashio.tar.gz --strip 1 -C /usr/src/bashio \
    && rm -f /tmp/bashio.tar.gz \
    && mv /usr/src/bashio/lib /usr/lib/bashio \
    && ln -s /usr/lib/bashio/bashio /usr/bin/bashio \
    \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /usr/src/*

# S6-Overlay
WORKDIR /root
ENTRYPOINT ["/init"]

COPY rootfs /
