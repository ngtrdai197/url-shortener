-- name: CreateUrl :one
INSERT INTO urls (id, user_id, short_url, long_url)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: GetUrlByShort :one
SELECT *
FROM urls
WHERE short_url = $1
LIMIT 1;

-- name: GetUrlByLong :one
SELECT *
FROM urls
WHERE long_url = $1
LIMIT 1;