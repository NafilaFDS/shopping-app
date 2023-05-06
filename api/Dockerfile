FROM node:18.16.0

WORKDIR /api

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3001

ENV JWT_SECRET=g9tZFPsocm

CMD ["npm", "start"]