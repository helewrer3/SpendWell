-- +goose Up
-- +goose StatementBegin
CREATE TABLE transaction_types (
  id UUID PRIMARY KEY,
  name VARCHAR(256) NOT NULL UNIQUE,
  description VARCHAR(256) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE transaction_types;
-- +goose StatementEnd