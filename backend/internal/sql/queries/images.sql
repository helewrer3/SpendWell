-- name: GetImages :many
SELECT * FROM images;

-- name: GetImage :one
SELECT * FROM images
where id = ?
LIMIT 1;