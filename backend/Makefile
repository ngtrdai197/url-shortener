include .env

PHONY:

start:
	go run main.go

live:
	~/go/bin/air -c .air.toml

migration:
	migrate create --ext sql --dir db/migrations -seq $(MIGRATION_FILE_NAME)

migrateup:
	migrate -path db/migrations -database "$(DB_SOURCE)" -verbose up

migrateup1:
	migrate -path db/migrations -database "$(DB_SOURCE)" -verbose up 1

migratedown:
	migrate -path db/migrations -database "$(DB_SOURCE)" -verbose down

migratedown1:
	migrate -path db/migrations -database "$(DB_SOURCE)" -verbose down 1

migrateforce:
	migrate -path db/migrations -database "$(DB_SOURCE)" -verbose force $(FORCE_VERSION)

sqlc:
	sqlc generate

proto:
	rm -f pkg/grpc/pb/*.go
	protoc --proto_path=pkg/grpc/proto --go_out=pkg/grpc/pb --go_opt=paths=source_relative \
	--go-grpc_out=pkg/grpc/pb --go-grpc_opt=paths=source_relative \
	pkg/grpc/proto/*.proto