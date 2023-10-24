-- name: CreateUser :one
INSERT INTO users (name, password, created_at, updated_at)
VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
RETURNING *;

-- name: GetUser :one
SELECT * FROM users
WHERE id = ? 
LIMIT 1;

-- name: VerifyUser :one
SELECT * FROM users
WHERE name = ? AND password = ? 
LIMIT 1;