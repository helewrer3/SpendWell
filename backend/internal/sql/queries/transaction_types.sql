-- name: GetTransactionTypes :many
SELECT * FROM transaction_types;

-- name: GetTransactionType :one
SELECT * FROM transaction_types
WHERE id = ?
LIMIT 1;