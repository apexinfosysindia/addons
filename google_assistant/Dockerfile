ARG BUILD_FROM
FROM $BUILD_FROM

ARG GOOGLE_GRPC_VERSION
ARG GOOGLE_LIBRARY_VERSION
ARG GOOGLE_SDK_VERSION 
ARG GOOGLE_AUTH_VERSION
ARG REQUESTS_OAUTHLIB_VERSION
ARG CHERRYPY_VERSION

# Install packages
# Debian buster left deb.debian.org for archive.debian.org (EOL); archive
# Release files are past their Valid-Until, and PyPA's rolling get-pip.py
# dropped Python 3.7 — pin the 3.7 bootstrap.
RUN sed -i \
        -e "s|http://deb.debian.org/debian |http://archive.debian.org/debian |" \
        -e "s|http://deb.debian.org/debian-security |http://archive.debian.org/debian-security |" \
        /etc/apt/sources.list \
    && apt-get -o Acquire::Check-Valid-Until=false update \
    && apt-get install -y --no-install-recommends \
        libportaudio2 \
        libasound2-plugins \
        pulseaudio-utils \
        python3 \
        python3-dev \
        build-essential \
    && curl --silent --show-error --retry 5 \
        "https://bootstrap.pypa.io/pip/3.7/get-pip.py" \
        | python3 \
    && pip3 install --no-cache-dir \
        cherrypy=="${CHERRYPY_VERSION}" \
        google-assistant-grpc=="${GOOGLE_GRPC_VERSION}" \
        google-assistant-library=="${GOOGLE_LIBRARY_VERSION}" \
        google-assistant-sdk=="${GOOGLE_SDK_VERSION}" \
        google-auth=="${GOOGLE_AUTH_VERSION}" \
        requests_oauthlib=="${REQUESTS_OAUTHLIB_VERSION}" \
    && apt-get remove -y --purge \
        python3-dev \
        build-essential \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Copy data
COPY rootfs /
