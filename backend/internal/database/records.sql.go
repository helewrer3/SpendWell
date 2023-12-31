// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.22.0
// source: records.sql

package database

import (
	"context"
)

const createRecord = `-- name: CreateRecord :one
INSERT INTO records (id, amount, description, user_id, category_id, transaction_type_id, from_account_id, to_account_id, created_at, updated_at)
VALUES (lower(hex(randomblob(16))), ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
RETURNING id, amount, description, user_id, category_id, transaction_type_id, from_account_id, to_account_id, created_at, updated_at
`

type CreateRecordParams struct {
	Amount            int64
	Description       string
	UserID            interface{}
	CategoryID        interface{}
	TransactionTypeID interface{}
	FromAccountID     interface{}
	ToAccountID       interface{}
}

func (q *Queries) CreateRecord(ctx context.Context, arg CreateRecordParams) (Record, error) {
	row := q.db.QueryRowContext(ctx, createRecord,
		arg.Amount,
		arg.Description,
		arg.UserID,
		arg.CategoryID,
		arg.TransactionTypeID,
		arg.FromAccountID,
		arg.ToAccountID,
	)
	var i Record
	err := row.Scan(
		&i.ID,
		&i.Amount,
		&i.Description,
		&i.UserID,
		&i.CategoryID,
		&i.TransactionTypeID,
		&i.FromAccountID,
		&i.ToAccountID,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const deleteRecord = `-- name: DeleteRecord :exec
DELETE FROM records
WHERE id = ?
`

func (q *Queries) DeleteRecord(ctx context.Context, id interface{}) error {
	_, err := q.db.ExecContext(ctx, deleteRecord, id)
	return err
}

const getRecord = `-- name: GetRecord :one
SELECT id, amount, description, user_id, category_id, transaction_type_id, from_account_id, to_account_id, created_at, updated_at FROM records
WHERE id = ?
`

func (q *Queries) GetRecord(ctx context.Context, id interface{}) (Record, error) {
	row := q.db.QueryRowContext(ctx, getRecord, id)
	var i Record
	err := row.Scan(
		&i.ID,
		&i.Amount,
		&i.Description,
		&i.UserID,
		&i.CategoryID,
		&i.TransactionTypeID,
		&i.FromAccountID,
		&i.ToAccountID,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const getRecords = `-- name: GetRecords :many
SELECT id, amount, description, user_id, category_id, transaction_type_id, from_account_id, to_account_id, created_at, updated_at FROM records
WHERE user_id = ?
`

func (q *Queries) GetRecords(ctx context.Context, userID interface{}) ([]Record, error) {
	rows, err := q.db.QueryContext(ctx, getRecords, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Record
	for rows.Next() {
		var i Record
		if err := rows.Scan(
			&i.ID,
			&i.Amount,
			&i.Description,
			&i.UserID,
			&i.CategoryID,
			&i.TransactionTypeID,
			&i.FromAccountID,
			&i.ToAccountID,
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

const updateRecord = `-- name: UpdateRecord :exec
UPDATE records
SET 
  description = ?, 
  amount = ?, 
  category_id = ?, 
  transaction_type_id = ?, 
  from_account_id = ?, 
  to_account_id = ?, 
  updated_at = CURRENT_TIMESTAMP
WHERE id = ?
`

type UpdateRecordParams struct {
	Description       string
	Amount            int64
	CategoryID        interface{}
	TransactionTypeID interface{}
	FromAccountID     interface{}
	ToAccountID       interface{}
	ID                interface{}
}

func (q *Queries) UpdateRecord(ctx context.Context, arg UpdateRecordParams) error {
	_, err := q.db.ExecContext(ctx, updateRecord,
		arg.Description,
		arg.Amount,
		arg.CategoryID,
		arg.TransactionTypeID,
		arg.FromAccountID,
		arg.ToAccountID,
		arg.ID,
	)
	return err
}
