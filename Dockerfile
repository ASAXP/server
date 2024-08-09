FROM node:18-alpine AS builder

RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV PORT=8080

EXPOSE 8080

CMD ["node", "/app/dist/index.js"]