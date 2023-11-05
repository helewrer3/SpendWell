package accounts

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/helewrer3/SpendWell/backend/internal/api"
	"github.com/helewrer3/SpendWell/backend/internal/sql"
)

func getAccount(w http.ResponseWriter, r *http.Request){
	account, err := sql.Queries.GetAccount(r.Context(), chi.URLParam(r, "id"))
	if err != nil {
		api.SendResponse(w, http.StatusInternalServerError, "error", err.Error())
		return
	}

	api.SendResponse(w, http.StatusOK, "ok", account)
}

func getAccounts(w http.ResponseWriter, r *http.Request){
	accounts, err := sql.Queries.GetAccounts(r.Context(), chi.URLParam(r, "id"))
	if err != nil {
		api.SendResponse(w, http.StatusInternalServerError, "error", err.Error())
		return
	}

	api.SendResponse(w, http.StatusOK, "ok", accounts)
}