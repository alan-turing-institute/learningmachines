FROM node:13.7.0

RUN apt-get update; apt-get -y install nano

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . . 
EXPOSE  4200
CMD [ "npm", "start" ]

