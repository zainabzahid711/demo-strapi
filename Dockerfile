# Strapi backend Dockerfile
FROM node:18-alpine

# Install system dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    vips-dev

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Build Strapi admin
RUN npm run build

EXPOSE 1337

# Start Strapi
CMD ["npm", "run", "develop"]