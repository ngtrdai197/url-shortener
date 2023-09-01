
.PHONY:

build:
	docker compose build

up:
	docker compose up -d

start:
	docker compose up --build

serve:
	docker compose up --build -d
