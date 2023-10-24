package auth

import (
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/helewrer3/SpendWell/backend/internal/api"
	"github.com/helewrer3/SpendWell/backend/internal/database"
	"github.com/helewrer3/SpendWell/backend/internal/sql"
)

func getUser(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.ParseInt(chi.URLParam(r, "id")	, 10, 64)
	if err != nil {
		api.SendResponse(w, http.StatusInternalServerError, "error", "Invalid ID")
		return
	}

	user, err := sql.Queries.GetUser(r.Context(), id)
	if err != nil {
		api.SendResponse(w, http.StatusNotFound, "error", err.Error())
		return
	}

	api.SendResponse(w, http.StatusOK, "ok", user)
}

func verifyUser(w http.ResponseWriter, r *http.Request) {
	user, err := sql.Queries.VerifyUser(r.Context(), database.VerifyUserParams{
		Name: r.URL.Query().Get("name"),
		Password: r.URL.Query().Get("password"),
	})
	if err != nil {
		api.SendResponse(w, http.StatusNotFound, "error", err.Error())
		return
	}

	api.SendResponse(w, http.StatusOK, "ok", user)
}
