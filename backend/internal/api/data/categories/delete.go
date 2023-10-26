package categories

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/helewrer3/SpendWell/backend/internal/api"
	"github.com/helewrer3/SpendWell/backend/internal/sql"
)

func deleteCategory(w http.ResponseWriter, r *http.Request) {
	err := sql.Queries.DeleteCategory(r.Context(), chi.URLParam(r, "id"))
	if err != nil {
		api.SendResponse(w, http.StatusInternalServerError, "error", err.Error())
		return
	}

	api.SendResponse(w, http.StatusInternalServerError, "ok", "Category deleted.")
}