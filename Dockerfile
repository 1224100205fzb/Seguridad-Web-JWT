# Etapa 1: Construcción
FROM node:20-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install

# Etapa 2: Ejecución
FROM node:20-slim
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]