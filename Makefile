
.PHONY:

build:
	docker compose build

up:
	docker compose up -d

run:
	docker compose up --build -d


# CMD for microservices development
ms-start:
	docker compose -f microservices-compose.yaml up --build
ms-down:
	docker compose -f microservices-compose.yaml down
ms-up:
	docker compose -f microservices-compose.yaml up