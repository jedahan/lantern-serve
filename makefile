MAKEFLAGS += --warn-undefined-variables
SHELL := /bin/bash

TAG?=latest

.PHONY: build


pack:
	browserify web/platform/helpers/array.js \
		web/platform/helpers/math.js \
		web/platform/config/fetch.js \
		web/platform/config/db.js \
		web/platform/vendor/core.js \
		web/platform/vendor/storage.js \
		web/platform/modules/network/database.js \
		web/platform/modules/network/object.js \
		web/platform/modules/network/user.js \
		-o web/platform/dist/a.js

	browserify web/platform/config/leaflet.js \
		web/platform/vendor/map.js \
		web/platform/modules/apps/director.js \
		web/platform/modules/apps/app.js \
		-o web/platform/dist/b.js

	browserify web/platform/vendor/map.js \
		web/platform/modules/atlas/atlas.js \
		web/platform/modules/atlas/collection.js \
		web/platform/modules/atlas/marker.js \
		 -o web/platform/dist/c.js

	browserify web/platform/vendor/display.js \
		web/platform/modules/apps/view.js \
		web/platform/modules/apps/menu.js \
		-o web/platform/dist/d.js

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