FROM node:alpine

WORKDIR /usr/app/blog/server/comments

COPY package.json ./
RUN npm install

COPY ./build ./build

CMD ["npm","run","deploy"]