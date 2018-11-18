FROM node:carbon
RUN npm install npm@latest -g
RUN npm install sqlite3 --build-from-source=sqlite3
RUN apt-get update && apt-get install nano && apt-get install unzip

EXPOSE 80
EXPOSE 443

WORKDIR /opt/lantern/
COPY web ./web
RUN mkdir -p ./web/db
RUN mkdir -p ./web/public
COPY package.json .
RUN npm install

CMD ["npm", "run", "start]
