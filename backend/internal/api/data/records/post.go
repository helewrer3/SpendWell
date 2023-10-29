package records

import (
	"encoding/json"
	"net/http"

	"github.com/helewrer3/SpendWell/backend/internal/api"
	"github.com/helewrer3/SpendWell/backend/internal/database"
	"github.com/helewrer3/SpendWell/backend/internal/sql"
)

func createRecord(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Amount						int		  `json:"amount"`
		Description 			string  `json:"description"`
		UserID 						string  `json:"userId"`
		CategoryID 				string  `json:"categoryId"`
		TransactionTypeID string  `json:"transactionTypeId"`
		FromAccountID			string  `json:"fromAcccountId"`
		ToAccountID				*string `json:"toAccountId"`
	}
	params := parameters{}
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&params)
	if err != nil {
		api.SendResponse(w, http.StatusInternalServerError, "error", "Couldn't decode parameters")
		return
	}

	category, err := sql.Queries.CreateRecord(r.Context(), database.CreateRecordParams{
		Amount: 						int64(params.Amount),
		Description: 				params.Description,
		UserID: 						params.UserID,
		CategoryID: 				params.CategoryID,
		TransactionTypeID: 	params.TransactionTypeID,
		FromAccountID: 			params.FromAccountID,
		ToAccountID: 				params.ToAccountID,
	})
	if err != nil {
		api.SendResponse(w, http.StatusInternalServerError, "error", err.Error())
		return
	}
	api.SendResponse(w, http.StatusOK, "ok", category)
}