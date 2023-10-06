FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

RUN npm install

COPY . .

RUN npm run build \
    && npm prune --production

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/dist/ ./dist/

CMD [ "node", "dist/src/main.js" ]