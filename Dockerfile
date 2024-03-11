
# server dockerfile
#node:latest, has all the features if you need them
FROM node:21-alpine 
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install 
COPY . .
EXPOSE 3001 
CMD ["npm", "run", "server"]




