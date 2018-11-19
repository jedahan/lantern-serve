MAKEFLAGS += --warn-undefined-variables
SHELL := /bin/bash

TAG?=latest

.PHONY: build


pack:
	browserify web/platform/a.js -o web/platform/dist/a.js
	browserify web/platform/b.js -o web/platform/dist/b.js
	browserify web/platform/c.js -o web/platform/dist/c.js
	browserify web/platform/d.js -o web/platform/dist/d.js

install: 
	npm install
	
build:
	docker-compose build

run:
	docker-compose up
	
deploy:
	triton profile set-current lantern
	triton-compose -f triton-compose.yml build
	triton-compose -f triton-compose.yml up -d