package records

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/helewrer3/SpendWell/backend/internal/api"
	"github.com/helewrer3/SpendWell/backend/internal/sql"
)

func getRecords(w http.ResponseWriter, r *http.Request) {
	records, err := sql.Queries.GetRecords(r.Context(), chi.URLParam(r, "userId"))
	if err != nil {
		api.SendResponse(w, http.StatusInternalServerError, "error", err.Error())
		return
	}

	api.SendResponse(w, http.StatusInternalServerError, "ok", records)
}

func getRecord(w http.ResponseWriter, r *http.Request) {
	record, err := sql.Queries.GetAccount(r.Context(), chi.URLParam(r, "id"))
	if err != nil {
		api.SendResponse(w, http.StatusBadRequest, "error", err.Error())
		return 
	}

	api.SendResponse(w, http.StatusInternalServerError, "ok", record)
}