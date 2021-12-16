#!make
include .env
export $(shell sed 's/=.*//' .env)


init:
	docker-compose pull
	docker-compose up -d --build
	@echo "System ready!"


update:
	docker-compose pull
	docker-compose up -d
	docker-compose restart

	@echo "System updated!"


build:
	docker-compose pull
	docker-compose up -d --build
	@echo "Build ready!"
