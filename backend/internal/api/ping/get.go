package ping

import (
	"net/http"

	"github.com/helewrer3/SpendWell/backend/internal/api"
)

func ping(w http.ResponseWriter, r *http.Request) {
	api.SendResponse(w, http.StatusOK, "ok", "pong")
}