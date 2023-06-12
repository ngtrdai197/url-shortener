FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN npm install -g pnpm@latest && \
  pnpm install

COPY . .

EXPOSE 5173

CMD ["pnpm", "dev"]
