FROM node:carbon
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y apt-utils \
	&& apt-get install -y nano

RUN mkdir -p /opt/lantern/
WORKDIR /opt/lantern/
COPY package.json .
RUN npm install

RUN mkdir -p ./db
COPY bin ./bin
COPY web ./web

COPY certs ./certs

ARG apps
RUN git clone "${apps:-https://github.com/lantern-works/lantern-apps}" ./apps
RUN ls -al

EXPOSE 80
EXPOSE 443
EXPOSE 8765

CMD ["npm", "run", "start"]