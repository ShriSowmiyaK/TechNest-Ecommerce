FROM node:current-alpine3.22

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm","run","start"]