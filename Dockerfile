FROM node:21-alpine

WORKDIR /app/server
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 3001
CMD [ "npm","run", "server" ]