FROM node:alpine

WORKDIR /user/app/blog/client

COPY package.json ./
RUN npm install

COPY ./ ./

CMD ["npm","start"]