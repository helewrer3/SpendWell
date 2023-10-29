package categories

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/helewrer3/SpendWell/backend/internal/api"
	"github.com/helewrer3/SpendWell/backend/internal/database"
	"github.com/helewrer3/SpendWell/backend/internal/sql"
)

func updateCategory(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Name    string `json:"name"`
		ImageID string `json:"imageId"`
	}
	params := parameters{}
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&params)
	if err != nil {
		api.SendResponse(w, http.StatusBadRequest, "error", "Couldn't decode parameters")
		return
	}

	err = sql.Queries.UpdateCategory(r.Context(), database.UpdateCategoryParams{
		Name:    params.Name,
		ID:      chi.URLParam(r, "id"),
		ImageID: params.ImageID,
	})
	if err != nil {
		api.SendResponse(w, http.StatusInternalServerError, "error", err.Error())
		return
	}

	api.SendResponse(w, http.StatusOK, "ok", "Updated category.")
}