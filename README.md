# Url Shorterner :tada:

Build a service for shortening url, idea will generate a unique ID (Twitter snowflake) and convert that unique id (base 10) to base 64

- Backend: Golang (1.20)
- Frontend: ReactJs (18.2.0)

## Backend

### Create .env file

```bash
cp .env.example .env
```

### Start backend

```bash
go run main.go
```

### Run migrations

- Install `golang-migrate`

```bash
curl -L https://github.com/golang-migrate/migrate/releases/download/$version/migrate.$os-$arch.tar.gz | tar xvz
```

or for `Macos`

```bash
brew install golang-migrate
```

- Apply the migration's changes to the database

```bash
make migrateup
```

### How can I authenticate?

```bash
curl --location 'http://localhost:8088/users' \
--header 'Content-Type: application/json' \
--data '{
    "username":"johndoe",
    "password": "exam_password",
    "full_name": "John Doe"
}'
```

```bash
curl --location 'http://localhost:8088/users/login' \
--header 'Content-Type: application/json' \
--data '{
    "username": "johndoe",
    "password": "exam_password"
}'
```

### Generate shortened url

```bash
# Create
curl --location 'http://localhost:8088/urls' \
--header 'authorization: bearer <access_token>' \
--header 'Content-Type: application/json' \
--data '{
    "long_url": "https://www.youtube.com/watch?v=vC4dLeqnvAw&ab_channel=SeanStudy"
}'
```

```json
// Response
{
  "id": 1665817125203611648,
  "short_url": "Fx4r2XiGEAA",
  "long_url": "https://www.youtube.com/watch?v=vC4dLeqnvAw&ab_channel=SeanStudy",
  "created_at": "2023-06-05T20:25:26.708125Z"
}
```

```bash
# Redirect
localhost:8088/r?v=Fx4r2XiGEAA
```

<hr />

## Web app (WIP)

<hr />

## Use docker for testing or development purposes

If you haven't run the command: `cp .env.example .env`, Don't forget to run it:

```bash
cp .env.example .env
```

```bash
docker-compose up --build
```

...

## The project is still in progress (WIP :rocket:)
