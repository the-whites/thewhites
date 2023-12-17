# Node image template (node v18.??.?? & debian-bullseye)
FROM node:18-bullseye

# Benodigdheden voor node
WORKDIR /usr/src/app
RUN chown node:node ./
USER node
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Voeg de folders toe die de webserver uiterst nodig heeft
ADD ./src /src
ADD ./public /public

# Installeer npm packages vanuit package.json en run een clean install.
ADD package.json package-lock.json* ./
RUN npm ci && npm cache clean --force

# Open port 8055, om conflicten met andere poorten te voorkomen en om de toegang via deze poort toe te staan naar de webserver
EXPOSE 8055

# Start de frontend webserver (npm command)
CMD ["npm", "run", "dev"]