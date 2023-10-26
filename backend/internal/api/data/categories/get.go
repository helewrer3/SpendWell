package categories

import (
	"net/http"

	"github.com/helewrer3/SpendWell/backend/internal/api"
	"github.com/helewrer3/SpendWell/backend/internal/sql"
)

func getCategories(w http.ResponseWriter, r *http.Request) {
	categories, err := sql.Queries.GetCategories(r.Context())
	if err != nil {
		api.SendResponse(w, http.StatusInternalServerError, "error", err.Error())
		return
	}

	api.SendResponse(w, http.StatusInternalServerError, "ok", categories)
}