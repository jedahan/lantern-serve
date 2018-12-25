FROM node:carbon

# Build Arguments
ARG DEBIAN_FRONTEND=noninteractive
ARG APPS_URI

# Files & Repositories
RUN apt-get update && apt-get install -y apt-utils \
	&& apt-get install -y nano

RUN mkdir -p /opt/server/apps

WORKDIR /opt/server/
COPY package.json .
RUN npm install
RUN mkdir -p ./db
COPY bin ./bin
COPY web ./web
COPY certs ./certs
RUN echo "Installed Server Directory:"
RUN ls -al
RUN echo "Installed Apps:"
RUN ls -al /opt/server/certs
RUN if [ $APPS_URI ]; then git clone "${APPS_URI}" ./apps; fi

# Run Web & Database Server
EXPOSE 80
EXPOSE 443
EXPOSE 8765
CMD ["npm", "run", "start"]