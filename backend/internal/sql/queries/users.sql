-- name: CreateUser :one
INSERT INTO users (id, name, password, salt, created_at, updated_at)
VALUES (lower(hex(randomblob(16))), ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
RETURNING *;

-- name: GetUserSalt :one
SELECT salt FROM users
where name = ?
LIMIT 1;

-- name: GetUser :one
SELECT * FROM users
WHERE id = ? 
LIMIT 1;

-- name: VerifyUser :one
SELECT * FROM users
WHERE name = ? AND password = ? 
LIMIT 1;