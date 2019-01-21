MAKEFLAGS += --warn-undefined-variables
SHELL := /bin/bash
TAG?=latest
CERTS := web/certs/dev.lantern.link.pem

.PHONY: build certs clean install start run stage deploy pack $(PLATFORM)

build: pack $(CERTS)
	docker-compose -f env/dc-dev.yml build

install:
	npm install
	
start: pack $(CERTS)
	HOOK_ADD="./test/change-hook" \
	HOOK_DROP="./test/change-hook" \
	HOOK_UPDATE="./test/change-hook" \
	HOOK_RESTORE="./test/restore-hook" \
	HOOK_BACKUP="./test/backup-hook" \
	npm start	

run:
	docker-compose -f env/dc-dev.yml up

stage: pack
	docker-compose -f env/dc-stage.yml build
	docker-compose -f dc-stage.yml up -d

deploy: pack
	triton profile set-current lantern
	triton-compose -f env/dc-prod.yml build
	triton-compose -f env/dc-prod.yml up -d

pack: 
	cat node_modules/bulma/css/bulma.min.css \
		node_modules/leaflet/dist/leaflet.css \
		node_modules/leaflet.locatecontrol/dist/L.Control.Locate.min.css \
		node_modules/@fortawesome/fontawesome-free/css/all.min.css \
		node_modules/typeface-montserrat/index.css \
		> web/public/styles/vendor.css

	browserify platform/header.js \
		platform/vendor/core.js \
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
		platform/config/leaflet.js \
		platform/vendor/map.js \
		platform/modules/mapping/location.js \
		platform/modules/mapping/marker.js \
		platform/modules/mapping/atlas.js  \
		platform/modules/display/director.js \
		platform/vendor/display.js \
		platform/modules/display/app.js \
		platform/modules/display/view.js \
		platform/modules/display/menu.js \
		-o web/public/scripts/platform.js

clean:
	rm web/public/scripts/platform.js
	rm web/public/styles/vendor.css

certs/dev.lantern.link.pem:
	cd certs && mkcert dev.lantern.link
