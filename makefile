MAKEFLAGS += --warn-undefined-variables
SHELL := /bin/bash

TAG?=latest

.PHONY: build

pack:
	npm install
	browserify web/platform/pre.src.js -o web/platform/pre.js
	browserify web/platform/post.src.js -o web/platform/post.js

build:
	docker-compose build

run:
	docker-compose up
	
deploy:
	triton profile set-current lantern
	triton-compose -f triton-compose.yml build
	triton-compose -f triton-compose.yml up -d