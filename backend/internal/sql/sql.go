package sql

import (
	"database/sql"
	"os"

	"github.com/helewrer3/SpendWell/backend/internal/database"
	_ "github.com/mattn/go-sqlite3"
)

var Queries *database.Queries

func InitSQL() error{
	db, err := sql.Open("sqlite3", os.Getenv("DB_URL"))
	if err != nil {
		return err
	}

	Queries = database.New(db)
	return nil
}