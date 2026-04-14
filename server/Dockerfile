FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

# Windows checkouts may use CRLF; strip \r so the entrypoint runs in Linux containers
RUN sed -i 's/\r$//' docker-entrypoint.sh && chmod +x docker-entrypoint.sh

ENV NODE_ENV=production
EXPOSE 5001

ENTRYPOINT ["sh", "./docker-entrypoint.sh"]
