package transactionTypes

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/helewrer3/SpendWell/backend/internal/api"
	"github.com/helewrer3/SpendWell/backend/internal/sql"
)

func getTransactionType(w http.ResponseWriter, r *http.Request){
	transactionType, err := sql.Queries.GetTransactionType(r.Context(), chi.URLParam(r, "id"))
	if err != nil {
		api.SendResponse(w, http.StatusInternalServerError, "error", err.Error())
		return
	}

	api.SendResponse(w, http.StatusOK, "ok", transactionType)
}

func getTransactionTypes(w http.ResponseWriter, r *http.Request){
	transactionTypes, err := sql.Queries.GetTransactionTypes(r.Context())
	if err != nil {
		api.SendResponse(w, http.StatusInternalServerError, "error", err.Error())
		return
	}

	api.SendResponse(w, http.StatusOK, "ok", transactionTypes)
}