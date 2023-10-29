-- name: CreateCategory :one
INSERT INTO categories (id, name, user_id, image_id, created_at, updated_at)
VALUES (lower(hex(randomblob(16))), ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
RETURNING *;

-- name: UpdateCategory :exec
UPDATE accounts
SET 
  name = ?, 
  image_id = ?, 
  updated_at = CURRENT_TIMESTAMP
WHERE id = ?;

-- name: DeleteCategory :exec
DELETE FROM categories
WHERE id = ?;

-- name: GetCategories :many
SELECT * FROM categories
WHERE user_id = ?;

-- name: GetCategory :one
SELECT * FROM categories
WHERE id = ?;