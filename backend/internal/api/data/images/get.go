package images

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/helewrer3/SpendWell/backend/internal/api"
	"github.com/helewrer3/SpendWell/backend/internal/sql"
)

func getImageMetaData(w http.ResponseWriter, r *http.Request) {
	image, err := sql.Queries.GetImage(r.Context(), chi.URLParam(r, "id"))
	if err != nil {
		api.SendResponse(w, http.StatusNotFound, "error", err.Error())
		return
	}
	
	api.SendResponse(w, http.StatusOK, "ok", image)
}

func getImagesMetaData(w http.ResponseWriter, r *http.Request) {
	images, err := sql.Queries.GetImages(r.Context())
	if err != nil {
		api.SendResponse(w, http.StatusNotFound, "error", err.Error())
		return
	}

	api.SendResponse(w, http.StatusOK, "ok", images)
}