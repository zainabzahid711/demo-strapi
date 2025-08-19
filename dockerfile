FROM node:18-alpine
WORKDIR /app

# Set npm registry + timeout to avoid install failures
RUN npm config set registry https://registry.npmjs.org/ \
    && npm config set fetch-retry-maxtimeout 600000 \
    && npm config set fetch-timeout 600000

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 1337
CMD ["npm", "run", "develop"]
