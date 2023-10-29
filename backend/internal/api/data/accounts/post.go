package accounts

import (
	"encoding/json"
	"net/http"

	"github.com/helewrer3/SpendWell/backend/internal/api"
	"github.com/helewrer3/SpendWell/backend/internal/database"
	"github.com/helewrer3/SpendWell/backend/internal/sql"
)

func createAccount(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		Name 		string `json:"name"`
		Amount 	int 	 `json:"amount"`
		UserID 	string `json:"userId"`
		ImageID string `json:"imageId"`
	}
	params := parameters{}
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&params)
	if err != nil {
		api.SendResponse(w, http.StatusInternalServerError, "error", "Couldn't decode parameters")
		return
	}

	category, err := sql.Queries.CreateAccount(r.Context(), database.CreateAccountParams{
		Name: 		params.Name,
		Amount: 	int64(params.Amount),
		UserID: 	params.UserID,
		ImageID: 	params.ImageID,
	})
	if err != nil {
		api.SendResponse(w, http.StatusInternalServerError, "error", err.Error())
		return
	}
	api.SendResponse(w, http.StatusOK, "ok", category)
}