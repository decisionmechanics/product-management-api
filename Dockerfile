# docker build -t andrewtait/product-management-api .
# docker run -p 8080:8080 -d --name product-management-api --rm andrewtait/product-management-api

FROM node:20.9.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./dist .
COPY .env .

EXPOSE 8080

CMD [ "node", "server.js" ]