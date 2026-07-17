ARG BUILD_FROM
# hadolint ignore=DL3006
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Setup base
ARG LIBRESPOT_VERSION="0.8.0"
# hadolint ignore=DL3003,DL3018
RUN \
    apk add --no-cache \
        libssl3 \
        libcrypto3 \
    \
    && apk add --no-cache --virtual .build-dependencies \
        build-base \
        cargo \
        git \
        protobuf-dev \
        pulseaudio-dev \
        cmake \
        clang20-libclang \
        openssl-dev \
    \
    && apk add --no-cache \
        pulseaudio \
    \
    && cargo install --force --locked bindgen-cli \
    && export PATH="$HOME/.cargo/bin:$PATH" \
    && cargo install \
        --locked \
        --no-default-features \
        --features "native-tls pulseaudio-backend with-libmdns" \
        --root /usr \
        --bin librespot \
        --version "${LIBRESPOT_VERSION}" \
        --verbose \
        -- librespot \
    \
    && cargo uninstall bindgen-cli \
    && apk del --no-cache --purge .build-dependencies \
    && rm -fr \
        /tmp/* \
        ~/.cargo \
        /usr/.crates.toml \
        /usr/.crates2.json

# Copy root filesystem
COPY rootfs /
