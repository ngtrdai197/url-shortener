# Url Shortener :tada:
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Build a service for shortening url, idea will generate a unique ID (Twitter snowflake) and convert that unique id (base10) to base64

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
curl --location 'http://localhost:8088/auth/login' \
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

```bash
# Refresh token
curl --location 'http://localhost:8088/auth/renew-token' \
--header 'Content-Type: application/json' \
--data '{
    "refresh_token": "v2.local.Wo4HNdTdHgopv2flrjNfXJUYSSIDNZc0jzw9GlS4stZD2xwWOs6LFskg4fPO_uIZR-pIIn_pYC6UWdoqhXm3N3AznAOpKdPu1Ufo7vt1QGZERiku7qa6WN-gAAgIGxSf_LyQTKs6k_5JN4KhM4mKnZqwPvqWp-owdsUf0ynGF1r6h8xPi92dGkSccbeCFBXJCh9QrLxmCpfk8pwmgFMO_4LahkGQSn7wGpuuLg8P4aN4uhghMj4EqE05n2Bv9JX5.bnVsbA"
}'
```

```json
// Refresh token response
{
  "access_token": "v2.local.U7S1VeVHXpsnBaRcBBSkVfLWUfCVbKtoBcUbDzopm3zcXgILRdon68wArpF9-B4Wmzc-PPcm8ZHc2sXSpA27GcczzmpMD1EpMV27eyrzl8qTpcIzTo1L0jrJJ3tZyDVRae4krYeK9FCVdfDtkkCL-1lFxZf5pyKuVxdFTKEwqXFjpTUJw-0P-i7z60Jj9TgdskOMs3dF9OOucaSX0qkFeCft7cxaFtldXqtqjA5vxi-QHlQWZ87cWcDCEW46Kzl9.bnVsbA",
  "access_token_expires_at": "2023-06-27T01:28:01.282398+07:00"
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

### Get a list of user's shortened urls, based on access token

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
      "user": {
        "id": 1,
        "username": "johndoe",
        "full_name": "John Doe",
        "created_at": "2023-06-12T12:20:40.20189Z"
      },
      "short_url": "FybAEDzGEAA",
      "long_url": "https://www.youtube.com/watch?v=yc5gRiWGjT0&ab_channel=B%C3%A1cs%C4%A9H%E1%BA%A3i",
      "description": "Bác sĩ Hải - Rolling Ball | New Mixtape 2021 | House Lak - Viet Deep",
      "created_at": "2023-06-12T12:20:50.997353Z"
    }
  ]
}
```

### Get all shortened urls on the system

```bash
curl --location 'http://localhost:8088/all-urls?page=1&limit=10' \
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
      "user": {
        "id": 1,
        "username": "johndoe",
        "full_name": "John Doe",
        "created_at": "2023-06-12T12:20:40.20189Z"
      },
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

## Web App

### Create .env file

```bash
cp .env.example .env
```

...

<hr />

## Use docker for testing or development purposes

If you haven't run the command: `cp .env.example .env`, Don't forget to run it:

```bash
cp .env.example .env
```

```bash
# build and up services
$ make build

# up services
$ make up
```

...

## The project is still in progress (WIP :rocket:)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://nguyendai.dev/"><img src="https://avatars.githubusercontent.com/u/37446552?v=4?s=100" width="100px;" alt="Dai Nguyen"/><br /><sub><b>Dai Nguyen</b></sub></a><br /><a href="https://github.com/ngtrdai197/url-shortener/commits?author=ngtrdai197" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/toannt97"><img src="https://avatars.githubusercontent.com/u/54499867?v=4?s=100" width="100px;" alt="toannt97"/><br /><sub><b>toannt97</b></sub></a><br /><a href="https://github.com/ngtrdai197/url-shortener/commits?author=toannt97" title="Code">💻</a>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!