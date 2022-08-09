FROM node:alpine

WORKDIR /usr/app/blog/server/query

COPY package.json ./
RUN npm install

COPY ./build ./build

CMD ["npm","run","deploy"]