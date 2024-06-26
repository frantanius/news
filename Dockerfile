FROM node:18-alpine

WORKDIR /app

COPY package*.json .

RUN npm install -g pnpm && pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "start"]
