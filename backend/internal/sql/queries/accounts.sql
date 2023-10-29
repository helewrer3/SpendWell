-- name: CreateAccount :one
INSERT INTO accounts (id, name, amount, user_id, image_id, created_at, updated_at)
VALUES (lower(hex(randomblob(16))), ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
RETURNING *;

-- name: UpdateAccount :exec
UPDATE accounts
SET 
  name = ?, 
  amount = ?, 
  image_id = ?, 
  updated_at = CURRENT_TIMESTAMP
WHERE id = ?;

-- name: DeleteAccount :exec
DELETE FROM accounts
WHERE id = ?;

-- name: GetAccount :one
SELECT * FROM accounts
where id = ?
LIMIT 1;

-- name: GetAccounts :many
SELECT * FROM accounts
WHERE user_id = ?;