FROM node:carbon
WORKDIR /opt/lantern/
RUN mkdir ./db
RUN mkdir ./public
COPY . .
RUN npm install
EXPOSE 80
CMD ["npm", "start"]