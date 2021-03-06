FROM node:carbon
RUN npm install npm@latest -g
RUN npm install sqlite3 --build-from-source=sqlite3
RUN apt-get update && apt-get install nano

EXPOSE 80
EXPOSE 443

WORKDIR /opt/lantern/
RUN mkdir ./db
RUN mkdir ./logs
RUN mkdir ./public

COPY package.json .
RUN npm install

COPY . .

RUN npm run refresh

CMD ["npm", "start"]