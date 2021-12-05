FROM node:16-alpine

WORKDIR /src/

COPY package.json /src/

RUN  npm i --silent

COPY . /src

CMD npm run start