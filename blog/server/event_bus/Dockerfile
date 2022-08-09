FROM node:alpine

WORKDIR /usr/app/blog/server/event_bus

COPY package.json ./
RUN npm install

COPY ./build ./build

CMD ["npm","run","deploy"]