# lantern-serve

This is the map-centric platform for the Lantern. All applications run on top of this server and database.


### SSL Certificates

Our server runs only in secure mode. You must generate SSL certificates to match your hosting setup. This can be done using certbot or with your preferred commercial SSL certificate provider. You can reach out to our team for certificates for now. More automation coming soon.


### Run In NPM


```bash
npm install & npm start
```

While developing locally, we recommend using the dev.lantern.link domain name to avoid unexpected browser errors. This points to 127.0.0.1.

After starting your server it will be available here: https://dev.lantern.link:9443


### Run in Docker

This command loads the server into a basic Node.js Docker container:

```bash
make stage
```

After starting your container, the server will be available here: https://dev.lantern.link


### Requirements

A local [Docker](https://www.docker.com/community-edition) environment is required to begin.


### Disclaimer
This repository is under active development and not yet intended for widespread use.