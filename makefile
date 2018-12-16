MAKEFLAGS += --warn-undefined-variables
SHELL := /bin/bash

TAG?=latest

.PHONY: build

pack:


	browserify platform/vendor/core.js \
		platform/config/leaflet.js \
		platform/vendor/map.js \
		platform/modules/atlas/location.js \
		platform/modules/atlas/atlas.js  \
		-o web/public/platform/a.js

	browserify platform/vendor/display.js \
		platform/modules/application/director.js \
		platform/modules/application/app.js \
		platform/modules/application/view.js \
		platform/modules/application/menu.js \
		-o web/public/platform/b.js

	browserify platform/helpers/array.js \
		platform/helpers/string.js \
		platform/helpers/math.js \
		platform/vendor/storage.js \
		platform/modules/network/item.js \
		platform/modules/atlas/marker.js \
		platform/modules/network/database.js \
		platform/modules/user/feed.js \
		platform/modules/user/user.js \
		platform/modules/organization/organization.js \
		-o web/public/platform/c.js
		



install: 
	npm install


start:
	npm start	

build:
	docker-compose build

run:
	docker-compose up
	
deploy:
	triton profile set-current lantern
	triton-compose -f triton-compose.yml build
	triton-compose -f triton-compose.yml up -d