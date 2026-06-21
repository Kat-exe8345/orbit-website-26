ARG NODE_VERSION=22

# ============ Base stage ==============
FROM node:${NODE_VERSION}-slim AS base
WORKDIR /app


# Install pnpm (corepack enable automatically installs the latest version of pnpm)
RUN corepack enable

# ============ Dependencies stage ==============
FROM base AS deps

# copy package.json and pnpm-lock.yaml to install dependencies
COPY package.json pnpm-lock.yaml ./

# install deps using pnpm with frozen lockfile to ensure consistent installs
RUN pnpm install --frozen-lockfile 

# ============ Builder stage ==============
FROM base AS builder

# copy installed deps from folder to container
COPY --from=deps /app/node_modules ./node_modules

# copy other root dir files to container
COPY . .

# Build the app
RUN pnpm prisma generate
RUN pnpm build


# ============ Runner stage ==============
FROM node:${NODE_VERSION}-slim AS runner
RUN corepack enable
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# copy production assets and let node user own the files
COPY --from=builder --chown=node:node /app/public ./public

# make .next folder and let node user own it to use pre-render cache and other features that require writing to .next
RUN mkdir .next
RUN chown node:node .next

# copy static files and build files
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

# switch to non-root user
USER node

# expose 3000
EXPOSE 3000

# start the server
CMD ["sh", "-c", "pnpm prisma migrate deploy && node server.js"]