
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

# Kubernetes
forwardport:
	echo "Forwarding port ..."
	-kill -9 $$(lsof -i tcp:3333 | grep "kubectl" | awk '{print $$2}')
	-kubectl port-forward service/auth-service-public-api -n default 3333:80