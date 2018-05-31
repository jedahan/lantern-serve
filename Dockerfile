FROM node:carbon
WORKDIR /opt/lantern/
RUN mkdir ./db
RUN mkdir ./public
COPY . .
RUN npm install npm@latest -g
RUN npm install --build-from-source=sqlite3
EXPOSE 80
CMD ["npm", "start"]