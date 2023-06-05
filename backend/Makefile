include .env

PHONY:
start:
	go run main.go
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

sqlc:
	sqlc generate