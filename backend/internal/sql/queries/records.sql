-- name: CreateRecord :one
INSERT INTO records (id, amount, description, user_id, category_id, transaction_type_id, from_account_id, to_account_id, created_at, updated_at)
VALUES (lower(hex(randomblob(16))), ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
RETURNING *;

-- name: UpdateRecord :exec
UPDATE records
SET 
  description = ?, 
  amount = ?, 
  category_id = ?, 
  transaction_type_id = ?, 
  from_account_id = ?, 
  to_account_id = ?, 
  updated_at = CURRENT_TIMESTAMP
WHERE id = ?;

-- name: GetRecords :many
SELECT * FROM records
WHERE user_id = ?;

-- name: GetRecord :one
SELECT * FROM records
WHERE id = ?;

-- name: DeleteRecord :exec
DELETE FROM records
WHERE id = ?;