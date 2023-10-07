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
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/jwt_key/ ./jwt_key/

CMD [ "node", "dist/src/main.js" ]