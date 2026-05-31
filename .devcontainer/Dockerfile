FROM node:24-trixie-slim

RUN apt update && apt install -y --no-install-recommends \
    sudo \
    procps \
    strace \   
    python3 \
    make \
    g++ \
    libudev-dev \ 
    udev \
    usbutils \
    tzdata \
    libasound2 \
    libfreetype6 \
    libopus0 \
    libopusfile0 \
    && rm -rf /var/lib/apt/lists/*

RUN echo "node ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/node && chmod 0440 /etc/sudoers.d/node

RUN npm install -g pnpm

# dialout group gives access to /dev/ttyUSB*
RUN usermod -aG dialout node

USER node
WORKDIR /workspace