MAKEFLAGS += --warn-undefined-variables
SHELL := /bin/bash

TAG?=latest

.PHONY: build

build:
	docker-compose build

run:
	docker-compose up
	
deploy:
	triton profile set-current lantern
	triton-compose build
	triton-compose up -d