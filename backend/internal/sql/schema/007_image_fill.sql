-- +goose Up
-- +goose StatementBegin
INSERT INTO images (id, name, image_path, created_at, updated_at)
VALUES (lower(hex(randomblob(16))), 'dummy', '../../internal/assets/images/dummy.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DELETE FROM images;
-- +goose StatementEnd