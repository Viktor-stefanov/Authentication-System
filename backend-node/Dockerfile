FROM node:20.4.0

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g typescript

COPY . .

RUN tsc

EXPOSE 8080

CMD ["node", "dist/index.js"]
