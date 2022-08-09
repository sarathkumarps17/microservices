FROM node:alpine

WORKDIR /usr/app/blog/server/moderation

COPY package.json ./
RUN npm install

COPY ./build ./build

CMD ["npm","run","deploy"]