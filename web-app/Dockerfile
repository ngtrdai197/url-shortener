FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# DEFAULT PORT OF VITE
EXPOSE 5173

CMD ["npm", "run", "dev"]