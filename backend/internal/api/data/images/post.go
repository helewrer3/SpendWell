package images

import (
	"encoding/json"
	"io"
	"net/http"
	"os"

	"github.com/helewrer3/SpendWell/backend/internal/api"
)
func getImage(w http.ResponseWriter, r *http.Request) {
	type parameters struct {
		ImagePath string `json:"imagePath"`
	}
	params := parameters{}
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&params)
	if err != nil {
		api.SendResponse(w, http.StatusInternalServerError, "error", "Couldn't decode parameters")
		return
	}

	file, err := os.Open(params.ImagePath)
	if err != nil {
		api.SendResponse(w, http.StatusInternalServerError, "error", err.Error())
		return
	}
	defer file.Close()
	
	contentType := "image/png"
	w.Header().Set("Content-Type", contentType)
	_, err = io.Copy(w, file)
	if err != nil {
		api.SendResponse(w, http.StatusInternalServerError, "error", err.Error())
		return
	}
}