-- +goose Up
-- +goose StatementBegin
CREATE TABLE accounts (
  id UUID PRIMARY KEY,
  name VARCHAR(256) NOT NULL UNIQUE,
  amount INTEGER NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  image_id UUID NOT NULL REFERENCES images(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE accounts;
-- +goose StatementEnd