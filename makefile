MAKEFLAGS += --warn-undefined-variables
SHELL := /bin/bash

TAG?=latest

.PHONY: build


pack:
	browserify platform/helpers/array.js \
		platform/helpers/string.js \
		platform/helpers/math.js \
		platform/config/fetch.js \
		platform/vendor/core.js \
		platform/vendor/storage.js \
		platform/modules/network/database.js \
		platform/modules/network/organization.js \
		platform/modules/network/collection.js \
		platform/modules/network/object.js \
		platform/modules/network/user.js \
		-o web/public/platform/a.js

	browserify platform/config/leaflet.js \
		platform/vendor/map.js \
		platform/modules/application/director.js \
		platform/modules/application/app.js \
		-o web/public/platform/b.js

	browserify platform/vendor/map.js \
		platform/modules/atlas/location.js \
		platform/modules/atlas/atlas.js \
		platform/modules/atlas/marker.js \
		 -o web/public/platform/c.js

	browserify platform/vendor/display.js \
		platform/modules/application/view.js \
		platform/modules/application/menu.js \
		-o web/public/platform/d.js

install: 
	npm install


start:
	npm start	

docker-build:
	docker-compose build

docker-run:
	docker-compose up
	
docker-deploy:
	triton profile set-current lantern
	triton-compose -f triton-compose.yml build
	triton-compose -f triton-compose.yml up -d