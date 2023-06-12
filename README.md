# Url Shortener :tada:

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
## Create user
curl --location 'http://localhost:8088/users' \
--header 'Content-Type: application/json' \
--data '{
    "username":"johndoe",
    "password": "exam_password",
    "full_name": "John Doe"
}'
```

```json
// Create user - response
{
  "id": 1,
  "username": "johndoe",
  "full_name": "John Doe",
  "created_at": "2023-06-12T12:20:40.20189Z"
}
```

```bash
curl --location 'http://localhost:8088/users/login' \
--header 'Content-Type: application/json' \
--data '{
    "username": "johndoe",
    "password": "exam_password"
}'
```

```json
// Login - response
{
  "session_id": "103188f9-5ce8-49ef-9885-b60462665265",
  "access_token": "v2.local.k1kqn77ryuA06WgAYjXPVTpqiGPBkxkofzBbcHfVO79dIbghRQ4A7gPnGrpAsbACQ66wPhC8gtfmN7Gq6sgv7eTuIWCusS2ROFb-2x8ErXRkXK9plQ1X3_ueyHdFVy7I_LlQmrYMSIwu_KriL--27ipAM2h8KKYd7yGZHyBf5rSn1LiG7EMaJJrZ9y2UfN69VSSE1M-Gt9QLNhkybnejh1V-9OmaNs5Fj0iKKf6ZazRs4MWdLqNpkyUe.bnVsbA",
  "access_token_expires_at": "2023-06-12T13:20:45.25644635Z",
  "refresh_token": "v2.local.ySXnTTRfQlw9AVP46eXkY6PZqC7IuZJn1ljk7QymSNb1ASTmPuPgUg3vpG63mYJR4gln9iDM7FJwgBdb4DeFjQwVh8vkIu5w6pvUfdZc3XXfAc8jVoHPXao4ZayOgGeZTGfEQkMchFVIXAXEC26lS9oU6l_-5vHOFthLbvoxJ0It9-B1OTOzZvarC8tpJJMdGEhzCm31kFryk0DCmwItQUdADZZVqHD-qcimeuCN4H0dArxOY_GLtLIQsDQ.bnVsbA",
  "refresh_token_expires_at": "2023-06-12T13:20:45.256509725Z",
  "user": {
    "id": 1,
    "username": "johndoe",
    "full_name": "John Doe",
    "created_at": "2023-06-12T12:20:40.20189Z"
  }
}
```

### Generate shortened url

```bash
# Create
curl --location 'http://localhost:8088/urls' \
--header 'authorization: Bearer <access_token>' \
--header 'Content-Type: application/json' \
--data '{
    "long_url": "https://www.youtube.com/watch?v=yc5gRiWGjT0&ab_channel=B%C3%A1cs%C4%A9H%E1%BA%A3i",
    "description": "Bác sĩ Hải - Rolling Ball | New Mixtape 2021 | House Lak - Viet Deep"
}'
```

```json
// Response
{
  "id": 1668231887958970368,
  "user_id": 1,
  "short_url": "FybAEDzGEAA",
  "long_url": "https://www.youtube.com/watch?v=yc5gRiWGjT0&ab_channel=B%C3%A1cs%C4%A9H%E1%BA%A3i",
  "description": "Bác sĩ Hải - Rolling Ball | New Mixtape 2021 | House Lak - Viet Deep",
  "created_at": "2023-06-12T12:20:50.997353Z"
}
```

### Get a list of shortened urls

```bash
curl --location 'http://localhost:8088/urls?page=1&limit=10' \
--header 'Authorization: Bearer <access_token>'
```

```json
// Response
{
  "paginate": {
    "limit": 10,
    "page": 1,
    "total": 1
  },
  "data": [
    {
      "id": 1668231887958970368,
      "user_id": 1,
      "short_url": "FybAEDzGEAA",
      "long_url": "https://www.youtube.com/watch?v=yc5gRiWGjT0&ab_channel=B%C3%A1cs%C4%A9H%E1%BA%A3i",
      "description": "Bác sĩ Hải - Rolling Ball | New Mixtape 2021 | House Lak - Viet Deep",
      "created_at": "2023-06-12T12:20:50.997353Z"
    }
  ]
}
```

```bash
# Redirect
localhost:8088/r?v=Fx4r2XiGEAA
```

<hr />

## Web app (WIP)

...

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
