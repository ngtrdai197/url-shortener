-- name: CreateUrl :one
INSERT INTO urls (id, user_id, short_url, long_url, description)
VALUES ($1, $2, $3, $4, $5)
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

-- name: GetListURLsOfUser :many
SELECT * FROM urls
WHERE user_id = $1
ORDER BY id DESC
LIMIT $2
OFFSET $3;

-- name: GetCountURLsOfUser :one
SELECT COUNT(1)
FROM urls WHERE user_id = $1;

-- name: GetListURLs :many
SELECT * FROM urls
ORDER BY id DESC
LIMIT $1
OFFSET $2;

-- name: GetCountURLs :one
SELECT COUNT(1)
FROM urls;