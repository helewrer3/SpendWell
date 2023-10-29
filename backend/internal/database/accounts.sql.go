// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.22.0
// source: accounts.sql

package database

import (
	"context"
)

const createAccount = `-- name: CreateAccount :one
INSERT INTO accounts (id, name, amount, user_id, image_id, created_at, updated_at)
VALUES (lower(hex(randomblob(16))), ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
RETURNING id, name, amount, user_id, image_id, created_at, updated_at
`

type CreateAccountParams struct {
	Name    string
	Amount  int64
	UserID  interface{}
	ImageID interface{}
}

func (q *Queries) CreateAccount(ctx context.Context, arg CreateAccountParams) (Account, error) {
	row := q.db.QueryRowContext(ctx, createAccount,
		arg.Name,
		arg.Amount,
		arg.UserID,
		arg.ImageID,
	)
	var i Account
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Amount,
		&i.UserID,
		&i.ImageID,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const deleteAccount = `-- name: DeleteAccount :exec
DELETE FROM accounts
WHERE id = ?
`

func (q *Queries) DeleteAccount(ctx context.Context, id interface{}) error {
	_, err := q.db.ExecContext(ctx, deleteAccount, id)
	return err
}

const getAccount = `-- name: GetAccount :one
SELECT id, name, amount, user_id, image_id, created_at, updated_at FROM accounts
where id = ?
LIMIT 1
`

func (q *Queries) GetAccount(ctx context.Context, id interface{}) (Account, error) {
	row := q.db.QueryRowContext(ctx, getAccount, id)
	var i Account
	err := row.Scan(
		&i.ID,
		&i.Name,
		&i.Amount,
		&i.UserID,
		&i.ImageID,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const getAccounts = `-- name: GetAccounts :many
SELECT id, name, amount, user_id, image_id, created_at, updated_at FROM accounts
WHERE user_id = ?
`

func (q *Queries) GetAccounts(ctx context.Context, userID interface{}) ([]Account, error) {
	rows, err := q.db.QueryContext(ctx, getAccounts, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Account
	for rows.Next() {
		var i Account
		if err := rows.Scan(
			&i.ID,
			&i.Name,
			&i.Amount,
			&i.UserID,
			&i.ImageID,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateAccount = `-- name: UpdateAccount :exec
UPDATE accounts
SET 
  name = ?, 
  amount = ?, 
  image_id = ?, 
  updated_at = CURRENT_TIMESTAMP
WHERE id = ?
`

type UpdateAccountParams struct {
	Name    string
	Amount  int64
	ImageID interface{}
	ID      interface{}
}

func (q *Queries) UpdateAccount(ctx context.Context, arg UpdateAccountParams) error {
	_, err := q.db.ExecContext(ctx, updateAccount,
		arg.Name,
		arg.Amount,
		arg.ImageID,
		arg.ID,
	)
	return err
}
