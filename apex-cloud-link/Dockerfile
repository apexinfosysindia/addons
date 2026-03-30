ARG BUILD_FROM=ghcr.io/hassio-addons/base:15.0.4
FROM ${BUILD_FROM}

# Add env
ENV LANG C.UTF-8

# Install jq for reading config options
RUN apk add --no-cache jq wget tar

# Copy the start script
COPY run.sh /
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]
