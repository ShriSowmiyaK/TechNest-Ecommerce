FROM node:current-alpine3.22

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm","run","start","--","--host","0.0.0.0"]