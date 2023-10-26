-- name: CreateRecord :one
INSERT INTO records (id, amount, description, user_id, category_id, transaction_type_id, from_account_id, to_account_id, created_at, updated_at)
VALUES (lower(hex(randomblob(16))), ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
RETURNING *;

-- name: UpdateRecord :exec
UPDATE records
SET 
  description = COALESCE(?, description), 
  amount = COALESCE(?, amount), 
  category_id = COALESCE(?, category_id), 
  transaction_type_id = COALESCE(?, transaction_type_id), 
  from_account_id = COALESCE(?, from_account_id), 
  to_account_id = COALESCE(?, to_account_id), 
  updated_at = CURRENT_TIMESTAMP
WHERE id = ?;

-- name: GetRecords :many
SELECT * FROM records;

-- name: DeleteRecord :exec
DELETE FROM records
WHERE id = ?;