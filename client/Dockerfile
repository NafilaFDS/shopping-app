FROM node:18.16.0

WORKDIR /client/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]