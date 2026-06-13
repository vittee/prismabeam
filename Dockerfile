FROM node:24-trixie AS builder

RUN npm install -g corepack@latest && corepack enable && corepack prepare pnpm

RUN apt update -y \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /build

COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml ./
COPY scripts/ ./scripts/
COPY tsconfig.json ./
COPY src/ ./src/
COPY ui/ ./ui/

RUN pnpm install
RUN pnpm --filter prismabeam-ui install

RUN pnpm build


FROM node:24-trixie-slim AS runtime

RUN apt update && apt install -y --no-install-recommends \
    udev \
    usbutils \
    libjemalloc2 \
    && rm -rf /var/lib/apt/lists/*

RUN usermod -aG dialout node

WORKDIR /app

# Copy built app and the node_modules compiled in the same environment
COPY --from=builder /build/dist ./
COPY --from=builder /build/node_modules ./node_modules

CMD ["node", "."]
