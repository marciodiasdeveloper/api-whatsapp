#
# Builder stage.
# This state compile our TypeScript to get the JavaScript code
#
FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./

COPY tsconfig*.json ./

COPY ./src ./src

RUN npm ci \
  && npm i \
  && npm run build

#
# Production stage.
# This state compile get back the JavaScript code from builder stage
# It will also install the production package only
#
FROM node:16-alpine

ARG NR_KEY

ARG APP_NAME

# For NewRelic
RUN apk add python2 build-base

WORKDIR /app

ENV NODE_ENV=production

# COPY prisma ./prisma/

COPY package*.json ./

COPY --from=builder --chown=node:node /app/dist/ /app/src/

RUN npm install --production

RUN cp /app/node_modules/newrelic/newrelic.js /app/src/newrelic.js \
  && sed -i "s|license key here|$NR_KEY|g" /app/src/newrelic.js \
  && sed -i "s|My Application|$APP_NAME|g" /app/src/newrelic.js

EXPOSE 3010

CMD [ "node", "/app/src/shared/infra/http/server.js" ]
