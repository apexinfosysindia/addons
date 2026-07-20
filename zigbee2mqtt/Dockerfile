ARG BUILD_FROM
FROM $BUILD_FROM as base

ENV LANG C.UTF-8
ARG BUILD_VERSION

RUN apk add --no-cache socat tini nodejs eudev && \
    # Validation to confirm that curl is installed in the base image.
    curl --version || (echo "curl missing" && exit 1)

# Dependencies and build
FROM base as dependencies_and_build

# Zigbee2MQTT itself is genuinely third-party software; it is fetched from the
# upstream Koenkk/zigbee2mqtt release tarball matching this add-on version.
RUN apk add --no-cache --virtual .buildtools npm make gcc g++ linux-headers udev git python3 && \
    echo "Installing Zigbee2MQTT version ${BUILD_VERSION%-*}" && \
    curl -sL -o "/app.tar.gz" \
    "https://github.com/Koenkk/zigbee2mqtt/archive/${BUILD_VERSION%-*}.tar.gz" && \
    tar xzvf "/app.tar.gz"  && rm "/app.tar.gz" && \
    mv -v "zigbee2mqtt-${BUILD_VERSION%-*}" app && \
    mkdir /app/dist && \
    jq -n --arg commit ${BUILD_VERSION%-*} '$commit' > /app/dist/.hash && \
    echo "Installed Zigbee2MQTT @ version $(cat /app/dist/.hash)" && \
    cd /app && \
    npm install -g $(jq -r '.packageManager' package.json) && \
    pnpm install --frozen-lockfile --unsafe-perm && \
    pnpm run build && \
    rm -rf node_modules && \
    pnpm install --frozen-lockfile --no-optional --unsafe-perm --prod && \
    # force serialport to rebuild on current platform instead of using prebuilds
    rm -rf `find ./node_modules/.pnpm/ -wholename "*/@serialport/bindings-cpp/prebuilds" -type d` && \
    pnpm rebuild @serialport/bindings-cpp

# Release
FROM base as release

WORKDIR /app

COPY rootfs /
COPY --from=dependencies_and_build /app/node_modules ./node_modules
COPY --from=dependencies_and_build /app/dist ./dist
COPY --from=dependencies_and_build /app/package.json /app/LICENSE /app/index.js ./

# ApexOS display-string transform: rewrites user-visible upstream-brand strings
# in the built backend (log/error strings, settings-schema titles/descriptions
# that drive the frontend settings UI) and in the served frontend bundles
# (incl. regenerating the precompressed .br variants). Wire protocol is not
# touched: settings keys, MQTT discovery topics and payload keys stay as-is
# (see rootfs/docker-entrypoint.sh for the pinned discovery topic values).
# The script fails the build if it makes zero replacements in an expected
# target or if any display form survives, so an upstream layout change
# surfaces at build time instead of shipping half-branded.
COPY debrand /usr/src/debrand
RUN node /usr/src/debrand/transform.mjs /app && rm -rf /usr/src/debrand

ENV NODE_ENV production

HEALTHCHECK --interval=1m --timeout=3s --start-period=30s --start-interval=3s \
  CMD curl -f http://localhost:8099/

ENTRYPOINT [ "/sbin/tini", "--", "/docker-entrypoint.sh"]
