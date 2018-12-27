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
		platform/config/leaflet.js \
		platform/vendor/map.js \
		platform/modules/atlas/location.js \
		platform/modules/atlas/atlas.js  \
		-o web/public/platform/a.js

	browserify platform/vendor/display.js \
		platform/vendor/storage.js \
		platform/modules/network/database.js \
		platform/modules/application/director.js \
		platform/modules/application/app.js \
		platform/modules/application/view.js \
		platform/modules/application/menu.js \
		-o web/public/platform/b.js

	browserify platform/helpers/array.js \
		platform/helpers/string.js \
		platform/helpers/math.js \
		platform/modules/network/item.js \
		platform/modules/atlas/marker.js \
		platform/modules/user/feed.js \
		platform/modules/user/user.js \
		platform/modules/organization/organization.js \
		platform/modules/organization/package.js \
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