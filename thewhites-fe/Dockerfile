FROM node:18-bullseye

WORKDIR /usr/src/app
RUN chown node:node ./
USER node

# Defaults to production, docker-compose overrides this to development on build and run.
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Add paths
ADD ./src /src
ADD ./public /public

# Install dependencies first, as they change less often than code.
ADD package.json package-lock.json* ./
RUN npm ci && npm cache clean --force

EXPOSE 8055

# Execute NodeJS (not NPM script) to handle SIGTERM and SIGINT signals.
CMD ["npm", "run", "dev"]