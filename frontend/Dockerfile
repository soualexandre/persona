FROM node:20-alpine3.19 AS base

WORKDIR /app

RUN apk add --no-cache \
    dumb-init \
    python3 \
    make \
    g++

COPY code/package.json code/package-lock.json ./code/

WORKDIR /app/code

RUN yarn

COPY code/ ./code/

EXPOSE 3070

CMD ["yarn", "dev", "--", "-p", "3070"]
