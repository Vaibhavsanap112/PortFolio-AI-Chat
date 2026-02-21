FROM node:18-alpine as builder

WORKDIR /app

COPY frontend/package*.json .
RUN npm install

COPY frontend/ .
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install serve to run the build
RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 80

CMD ["serve", "-s", "dist", "-l", "80"]
