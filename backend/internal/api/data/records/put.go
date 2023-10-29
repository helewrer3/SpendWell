package records

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/helewrer3/SpendWell/backend/internal/api"
	"github.com/helewrer3/SpendWell/backend/internal/database"
	"github.com/helewrer3/SpendWell/backend/internal/sql"
)

func updateRecord(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Amount						int		  `json:"amount"`
		Description 			string  `json:"description"`
		CategoryID 				string  `json:"categoryId"`
		TransactionTypeID string  `json:"transactionTypeId"`
		FromAccountID			string  `json:"fromAcccountId"`
		ToAccountID				*string `json:"toAccountId"`
	}
	params := parameters{}
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&params)
	if err != nil {
		api.SendResponse(w, http.StatusBadRequest, "error", "Couldn't decode parameters")
		return
	}

	err = sql.Queries.UpdateRecord(r.Context(), database.UpdateRecordParams{
		Amount: 						int64(params.Amount),
		ID: 								chi.URLParam(r, "id"),
		Description: 				params.Description,
		CategoryID: 				params.CategoryID,
		TransactionTypeID: 	params.TransactionTypeID,
		FromAccountID: 			params.FromAccountID,
		ToAccountID: 				params.ToAccountID,
	})
	if err != nil {
		api.SendResponse(w, http.StatusInternalServerError, "error", err.Error())
		return
	}

	api.SendResponse(w, http.StatusOK, "ok", "Updated category.")
}