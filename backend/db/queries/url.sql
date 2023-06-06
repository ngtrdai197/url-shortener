-- name: CreateUrl :one
INSERT INTO url (id, short_url, long_url)
VALUES ($1, $2, $3)
RETURNING *;

-- name: GetUrlByShort :one
SELECT *
FROM url
WHERE short_url = $1
LIMIT 1;

-- name: GetUrlByLong :one
SELECT *
FROM url
WHERE long_url = $1
LIMIT 1;