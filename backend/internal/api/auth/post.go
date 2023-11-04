package auth

import (
	"encoding/json"
	"net/http"

	"github.com/helewrer3/SpendWell/backend/internal/api"
	"github.com/helewrer3/SpendWell/backend/internal/database"
	"github.com/helewrer3/SpendWell/backend/internal/sql"
	"golang.org/x/crypto/argon2"
)

func createUser(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Name string `json:"name"`
		Password string `json:"password"`
	}
	params := parameters{}
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&params)
	if err != nil {
		api.SendResponse(w, http.StatusInternalServerError, "error", "Couldn't decode parameters")
		return
	}

	salt := argon2.IDKey([]byte(params.Name), []byte(params.Name), 1, 64*1024, 4, 32)
	hashedPassword := argon2.IDKey([]byte(params.Password + params.Name), []byte(salt), 1, 64*1024, 4, 32)

	user, err := sql.Queries.CreateUser(r.Context(), database.CreateUserParams{
		Name: params.Name,
		Password: string(hashedPassword),
		Salt: string(salt),
	})
	if err != nil {
		api.SendResponse(w, http.StatusNotFound, "error", err.Error())
		return
	}

	api.SendResponse(w, http.StatusOK, "ok", user.ID)
}
