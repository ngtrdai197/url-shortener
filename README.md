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

### Result code definition

```go
const (
	SuccessCode              = 1
	RequestBodyInvalidCode   = 2
	CreateAccessTokenCode    = 3
	NotFoundCode             = 4
	SomethingWentWrongCode   = 5
	CredentialsCode          = 6
	CreateRefreshTokenCode   = 7
	CreateSessionCode        = 8
	VerifyRefreshTokenCode   = 9
	CannotFoundSession       = 10
	BlockSessionCode         = 11
	IncorrectSessionUserCode = 12
	MismatchedSessionCode    = 13
	RequestBindQueryCode     = 14
	RecordAlreadyExistsCode  = 15
	ExpiredSessionCode       = 16
)
```

### Generate key for paseto token

```bash
# Create a new folder for store pair keys
mkdir keys && cd keys
```

```bash
# Create private key
openssl genrsa -out private_key.pem 1024
```

```bash
# Generate a public key from private
openssl rsa -in private_key.pem -pubout > public_key.pub
```

### How can I authenticate?

```bash
## Create user
curl --location 'http://localhost:8088/auth/register' \
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
  "result_code": 1,
  "message": "create new user successfully",
  "data": {
    "id": 1,
    "username": "johndoe",
    "full_name": "John Doe",
    "created_at": "2023-06-12T12:20:40.20189Z"
  }
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
  "result_code": 1,
  "message": "login successfully",
  "data": {
    "session_id": "dc34aa55-0c7e-49f1-87ad-d5e3bfcb050d",
    "access_token": "v2.local.eUVOrIiIFnsWyOiq4ai8KUAK7olncqz9hncbw2j0av6sKYh7x-kt2HeMNEO4kd07RSJa94ct2Wukd3H0Eoc42AtNiaZoF1SOzox8sf89ExgE8OdOzSOjuva1V9l-YxDn3sy764yIwv1fsLil6sI6FkLRK8TLR3W8yKaHwrdcLNmfnxPNfHZnPfIl9BrsIUuOUPaUZK71JHp6znfKbBAIkvXAPxBx75MxC_ypS88oBhc29Bbl1F7P4Hv6efQ.bnVsbA",
    "access_token_expires_at": "2023-07-13T09:31:56.532346803Z",
    "refresh_token": "v2.local.4yy2aaiTpSmWDNWBzcB64Z-CS6A1EgrlE7NyPIDJlF2vTVxS5ZO5wlB4fJMOgV2EFqIgcnavmnaIUkGMPYX0bSSkSxGe9od_5Hil85TMi45cHQj0NbTp5TQE7WwCJTX3CZ8I1ppqYxCQAqxLB6aCMx0yXOZNIDpvfK3_WgmWi0wmfdIUkCBolIFB2Bg1o2hOMuxd2FV_cpvEaSLEH5VNu7E_xDlUe7_2bZVyHlFY5tt0stLyOIdMzvNlAdI.bnVsbA",
    "refresh_token_expires_at": "2023-07-13T10:16:56.532424687Z"
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
  "result_code": 1,
  "message": "renew access token successfully",
  "data": {
    "access_token": "v2.local.ZVGZ-7K2CvTBIs3HYL8fxC6S2fHIKU06iLuy0vBxF9kLaz5fmWjzbEpMoqFq6jSAw_MD5sszRih18HCBmGcvCk99fFvt5YiASzS5rdNGIE6-8nEGOf0GmJNpTlqmQl1ZvdfxbCNMLCu1gip5eb2JQrSY51AMd_AIHUbNlVUxZuBFxuJUlNhdtqsUKiNg-gDtq-SW0iwKZLckbpn2p9TFCoG6EA6E5gTi602YfCPMGkw4XoO-CCJF5BYYdQc.bnVsbA",
    "access_token_expires_at": "2023-07-13T09:37:19.298197513Z"
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
  "result_code": 1,
  "message": "create new url successfully",
  "data": {
    "id": 1679419804362346496,
    "user_id": 1,
    "short_url": "F05_agPGEAA",
    "long_url": "https://www.youtube.com/watch?v=A-tX5PI3V0o&ab_channel=AndreeRightHand",
    "description": "Andree Right Hand - Chơi Như Tụi Mỹ | Official MV",
    "created_at": "2023-07-13T09:17:38.12884Z"
  }
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
  "result_code": 1,
  "message": "get list urls of user successfully",
  "data": {
    "paginate": {
      "limit": 10,
      "page": 1,
      "total": 1
    },
    "data": [
      {
        "id": 1679419804362346496,
        "user": {
          "id": 1,
          "username": "dainguyen",
          "full_name": "Dai Nguyen",
          "created_at": "2023-07-13T09:13:35.065909Z"
        },
        "short_url": "F05_agPGEAA",
        "long_url": "https://www.youtube.com/watch?v=A-tX5PI3V0o&ab_channel=AndreeRightHand",
        "description": "Andree Right Hand - Chơi Như Tụi Mỹ | Official MV",
        "created_at": "2023-07-13T09:17:38.12884Z"
      }
    ]
  }
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
  "result_code": 1,
  "message": "get list urls successfully",
  "data": {
    "paginate": {
      "limit": 10,
      "page": 1,
      "total": 1
    },
    "data": [
      {
        "id": 1679419804362346496,
        "user": {
          "id": 1,
          "username": "dainguyen",
          "full_name": "Dai Nguyen",
          "created_at": "2023-07-13T09:13:35.065909Z"
        },
        "short_url": "F05_agPGEAA",
        "long_url": "https://www.youtube.com/watch?v=A-tX5PI3V0o&ab_channel=AndreeRightHand",
        "description": "Andree Right Hand - Chơi Như Tụi Mỹ | Official MV",
        "created_at": "2023-07-13T09:17:38.12884Z"
      }
    ]
  }
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
