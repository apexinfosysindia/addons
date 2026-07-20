ARG BUILD_FROM
# hadolint ignore=DL3006
FROM ${BUILD_FROM}

# Confiure locale
ENV \
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US:en \
    LC_ALL=en_US.UTF-8 \
    PIP_BREAK_SYSTEM_PACKAGES=1

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Copy Python requirements file
COPY requirements.txt /tmp/requirements.txt

# Copy in extensions list
COPY vscode.extensions /root/vscode.extensions

# Setup base system
ARG BUILD_ARCH=amd64
ARG CODE_SERVER_VERSION="v4.107.0"
ARG APEX_CLI_VERSION="5.2.1"
# hadolint ignore=SC2181, DL3008
RUN \
    apt-get update \
    \
    && apt-get install -y --no-install-recommends \
        ack \
        libarchive-tools \
        build-essential \
        colordiff \
        git \
        iputils-ping \
        locales \
        mariadb-client \
        mosquitto-clients \
        net-tools \
        nmap \
        openssh-client \
        openssl \
        python3-dev \
        python3-venv \
        python3 \
        unzip \
        uuid-runtime \
        wget \
        zip \
        zsh \
        less \
    \
    && sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen \
    && locale-gen \
    \
    && curl https://bootstrap.pypa.io/get-pip.py | python3 \
    \
    && if [[ "${BUILD_ARCH}" = "aarch64" ]]; then ARCH="arm64"; fi \
    && if [[ "${BUILD_ARCH}" = "amd64" ]]; then ARCH="amd64"; fi \
    && curl -J -L -o /tmp/code.tar.gz \
        "https://github.com/coder/code-server/releases/download/${CODE_SERVER_VERSION}/code-server-${CODE_SERVER_VERSION#v}-linux-${ARCH}.tar.gz" \
    && mkdir -p /usr/local/lib/code-server \
    && tar zxvf \
        /tmp/code.tar.gz \
        --strip 1 -C /usr/local/lib/code-server \
    \
    && ln -s /usr/local/lib/code-server/bin/code-server /usr/local/bin/code-server \
    \
    && mkdir -p /root/.code-server/extensions \
    # ApexOS Config Helper installs from the org release asset, not the
    # marketplace (own fork; the loop below skips its line)
    && curl -JL --retry 5 -o /tmp/apexos.apexos-config-helper-2.2.0.vsix \
        "https://github.com/apexinfosysindia/config-helper/releases/download/v2.2.0-apexos.1/apexos-config-helper-2.2.0.vsix" \
    && mkdir -p /usr/local/lib/code-server/lib/vscode/extensions/apexos.apexos-config-helper-2.2.0 \
    && bsdtar --strip-components=1 -xf /tmp/apexos.apexos-config-helper-2.2.0.vsix \
        -C /usr/local/lib/code-server/lib/vscode/extensions/apexos.apexos-config-helper-2.2.0 extension \
    && uuid=$(uuidgen) \
    && grep -v "^apexos.apexos-config-helper#" /root/vscode.extensions | while read -r ext; do \
        extention="${ext%%#*}" \
        vendor="${extention%%.*}"; \
        slug="${extention#*.}"; \
        version="${ext##*#}"; \
        \
        echo "Installing vscode extension: ${slug} by ${vendor} @ ${version} "; \
        \
        echo "https://marketplace.visualstudio.com/_apis/public/gallery/publishers/${vendor}/vsextensions/${slug}/${version}/vspackage"; \
        curl -JL --retry 5 -o "/tmp/${extention}-${version}.vsix" \
            -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36" \
            -H "x-market-user-id: ${uuid}" \
            "https://marketplace.visualstudio.com/_apis/public/gallery/publishers/${vendor}/vsextensions/${slug}/${version}/vspackage"; \
        mkdir -p "/usr/local/lib/code-server/lib/vscode/extensions/${extention}-${version}"; \
        bsdtar --strip-components=1 -xf "/tmp/${extention}-${version}.vsix" \
                    -C "/usr/local/lib/code-server/lib/vscode/extensions/${extention}-${version}" extension; \
        [ $? -ne 0 ] && exit 1; \
        sleep 1; \
    done \
    && ls -la /usr/local/lib/code-server/lib/vscode/extensions/ \
    \
    && curl -L -s -o /usr/bin/apex \
        "https://github.com/apexinfosysindia/cli/releases/download/${APEX_CLI_VERSION}/apex_${BUILD_ARCH}" \
    && chmod a+x /usr/bin/apex \
    \
    && git clone --branch master --single-branch --depth 1 \
        "https://github.com/robbyrussell/oh-my-zsh.git" ~/.oh-my-zsh \
    \
    && git clone --branch master --single-branch --depth 1 \
        "https://github.com/zsh-users/zsh-autosuggestions" \
        ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions \
    && git clone --branch master --single-branch --depth 1 \
        "https://github.com/zsh-users/zsh-syntax-highlighting.git" \
        ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting \
    \
    && sed -i -e "s#bin/bash#bin/zsh#" /etc/passwd \
    \
    && update-alternatives \
        --install /usr/bin/python python /usr/bin/python3 10 \
    \
    && pip3 install --no-cache-dir -r /tmp/requirements.txt \
    \
    && apt-get purge -y --auto-remove \
        build-essential \
        libarchive-tools \
        python3-dev \
        uuid-runtime \
    \
    && find /usr/local \
        \( -type d -a -name test -o -name tests -o -name '__pycache__' \) \
        -o \( -type f -a -name '*.pyc' -o -name '*.pyo' \) \
        -exec rm -rf '{}' + \
    \
    && rm -fr \
        /root/.cache \
        /tmp/* \
        /var/{cache,log}/* \
        /var/lib/apt/lists/*

# Copy root filesystem
COPY rootfs /

# Health check
HEALTHCHECK \
    CMD curl --fail http://127.0.0.1:1337/healthz || exit 1
