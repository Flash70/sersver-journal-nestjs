FROM node:16.13-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]