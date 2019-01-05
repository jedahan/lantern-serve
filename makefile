MAKEFLAGS += --warn-undefined-variables
SHELL := /bin/bash
TAG?=latest

.PHONY: build


build:
	docker-compose -f dc-dev.yml build

run:
	docker-compose -f dc-dev.yml up
	
pack:
	browserify platform/vendor/core.js \
		platform/vendor/storage.js \
		platform/helpers/array.js \
		platform/helpers/string.js \
		platform/helpers/math.js \
		platform/modules/data/database.js \
		platform/modules/data/organization.js \
		platform/modules/data/package.js \
		platform/modules/data/item.js \
		platform/modules/data/user.js \
		platform/modules/data/feed.js \
		-o web/public/platform/a.js

	browserify platform/config/leaflet.js \
		platform/vendor/map.js \
		platform/modules/mapping/location.js \
		platform/modules/mapping/marker.js \
		platform/modules/mapping/atlas.js  \
		-o web/public/platform/b.js

	browserify platform/modules/display/director.js \
		platform/vendor/display.js \
		platform/modules/display/app.js \
		platform/modules/display/view.js \
		platform/modules/display/menu.js \
		-o web/public/platform/c.js

		
install: 
	npm install

start:
	npm start	

stage:
	docker-compose -f dc-stage.yml build
	docker-compuse -f dc-stage.yml up -d

deploy:
	triton profile set-current lantern
	triton-compose -f dc-prod.yml build
	triton-compose -f dc-prod.yml up -d