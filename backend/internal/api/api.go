package api

import (
	"encoding/json"
	"net/http"
)

type APIResponse struct {
	Message string `json:"message"`
	Payload interface{} `json:"payload"`
}

func SendResponse(w http.ResponseWriter, httpCode int, message string, payload interface{}){
	response, err := json.Marshal(APIResponse{
		Message: message,
		Payload: payload,
	})

	if err != nil {
		http.Error(w, "Failed to marshal JSON", http.StatusInternalServerError)
	}
	
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(httpCode)
	w.Write(response)

}