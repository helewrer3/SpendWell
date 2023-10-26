-- +goose Up
-- +goose StatementBegin
CREATE TABLE images (
  id UUID PRIMARY KEY,
  name VARCHAR(256) NOT NULL UNIQUE,
  image_path VARCHAR(256) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE images;
-- +goose StatementEnd