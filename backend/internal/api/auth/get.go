package auth

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/helewrer3/SpendWell/backend/internal/api"
	"github.com/helewrer3/SpendWell/backend/internal/database"
	"github.com/helewrer3/SpendWell/backend/internal/sql"
	"golang.org/x/crypto/argon2"
)

func getUser(w http.ResponseWriter, r *http.Request) {
	user, err := sql.Queries.GetUser(r.Context(), chi.URLParam(r, "id"))
	if err != nil {
		api.SendResponse(w, http.StatusNotFound, "error", err.Error())
		return
	}

	api.SendResponse(w, http.StatusOK, "ok", user)
}

func verifyUser(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("name")
	password := r.URL.Query().Get("password")
	salt, err := sql.Queries.GetUserSalt(r.Context(), name)
	if err != nil {
		api.SendResponse(w, http.StatusNotFound, "error", err.Error())
		return
	}

	hashedPassword := argon2.IDKey([]byte(password + name), []byte(salt), 1, 64*1024, 4, 32)
	user, err := sql.Queries.VerifyUser(r.Context(), database.VerifyUserParams{
		Name: name,
		Password: string(hashedPassword),
	})
	if err != nil {
		api.SendResponse(w, http.StatusNotFound, "error", err.Error())
		return
	}

	api.SendResponse(w, http.StatusOK, "ok", user)
}
