FROM node:carbon
RUN npm install npm@latest -g
RUN npm install sqlite3 --build-from-source=sqlite3

EXPOSE 80
EXPOSE 443

WORKDIR /opt/lantern/
RUN mkdir ./db
RUN mkdir ./logs
RUN mkdir ./public
COPY . .
RUN npm install

CMD ["npm", "start"]