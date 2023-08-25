# Backend service

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

### Get public key for verify paseto token

```bash
curl --location 'http://localhost:8088/pk'
```

```json
// Response
{
  "result_code": 1,
  "message": "ok",
  "data": "1eb9dbbbbc047c03fd70604e0071f0987e16b28b757225c11f00415d0e20b1a2"
}
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
