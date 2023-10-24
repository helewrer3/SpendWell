-- +goose Up
-- +goose StatementBegin
CREATE TABLE users (
  id integer PRIMARY KEY AUTOINCREMENT,
  name varchar(256) NOT NULL UNIQUE,
  password varchar(256) NOT NULL,
  created_at timestamp NOT NULL,
  updated_at timestamp NOT NULL
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE users;
-- +goose StatementEnd