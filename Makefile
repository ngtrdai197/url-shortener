
.PHONY:

build:
	docker compose build

up:
	docker compose up -d

run:
	docker compose up --build -d
