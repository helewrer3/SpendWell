package categories

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/helewrer3/SpendWell/backend/internal/api"
	"github.com/helewrer3/SpendWell/backend/internal/sql"
)

func getCategories(w http.ResponseWriter, r *http.Request) {
	categories, err := sql.Queries.GetCategories(r.Context(), chi.URLParam(r, "userId"))
	if err != nil {
		api.SendResponse(w, http.StatusInternalServerError, "error", err.Error())
		return
	}

	api.SendResponse(w, http.StatusInternalServerError, "ok", categories)
}

func getCategory(w http.ResponseWriter, r *http.Request) {
	category, err := sql.Queries.GetCategory(r.Context(), chi.URLParam(r, "id"))
	if err != nil {
		api.SendResponse(w, http.StatusBadRequest, "error", err.Error())
		return 
	}

	api.SendResponse(w, http.StatusInternalServerError, "ok", category)
}