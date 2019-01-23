FROM node:carbon

# Build Arguments
ARG DEBIAN_FRONTEND=noninteractive
ARG APPS_URI=https://github.com/lantern-works/lantern-apps 

# Files & Repositories
RUN apt-get update && apt-get install -y apt-utils \
    && apt-get install -y nano

RUN mkdir -p /lantern/server/apps

COPY . /lantern/server
WORKDIR /lantern/server/
RUN if [ ! -d ./apps ] ; then git clone "${APPS_URI}" ./apps; fi

# Run Web & Database Server
EXPOSE 80
EXPOSE 443
EXPOSE 8765
CMD ["npm", "run", "start"]