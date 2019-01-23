MAKEFLAGS += --warn-undefined-variables
SHELL := /bin/bash
TAG?=latest
CERTS := certs/dev.lantern.link.pem

.PHONY: build certs clean install start run stage deploy $(PLATFORM)

build: $(CERTS)
	docker-compose -f env/dc-dev.yml build

install:
	npm install
	if [ ! -d ./apps ] ; then git clone https://github.com/lantern-works/lantern-apps apps; fi
	
start: $(CERTS)
	HOOK_ADD="./hooks/change" \
	HOOK_DROP="./hooks/change" \
	HOOK_UPDATE="./hooks/change" \
	HOOK_RESTORE="./hooks/restore" \
	HOOK_BACKUP="./hooks/backup" \
	npm start	


pack: 
	browserify platform/web.js --standalone LX --outfile web/public/scripts/platform.js
	uglifyjs web/public/scripts/platform.js -o web/public/scripts/platform.min.js
	
run:
	docker-compose -f env/dc-dev.yml up

stage:
	docker-compose -f env/dc-stage.yml build
	docker-compose -f dc-stage.yml up -d

deploy:
	triton profile set-current lantern
	triton-compose -f env/dc-prod.yml build
	triton-compose -f env/dc-prod.yml up -d

clean:
	rm web/public/scripts/platform.js
	rm web/public/scripts/platform.min.js
	rm web/public/styles/vendor.css

certs/dev.lantern.link.pem:
	if [ ! -f ./web/certs/dev.lantern.link.pem ] ; then cd web/certs && mkcert dev.lantern.link; fi
