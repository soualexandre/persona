FROM node:20-alpine3.19 AS base

WORKDIR /app

RUN apk add --no-cache \
    dumb-init \
    python3 \
    make \
    g++

RUN yarn global add @nestjs/cli

COPY code/package.json ./ 
COPY code/tsconfig.json ./ 
COPY code/nest-cli.json ./

RUN yarn

COPY code/ ./

EXPOSE 3080

CMD ["nest", "start", "--watch", "--port", "3080"]
