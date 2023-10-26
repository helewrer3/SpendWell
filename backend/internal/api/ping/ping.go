package ping

import (
	"github.com/go-chi/chi/v5"
)

func initRoutes(pingRouter *chi.Mux){
	pingRouter.Get("/", ping)
}

func InitPing(router *chi.Mux){
	pingRouter := chi.NewRouter()
	initRoutes(pingRouter)
	router.Mount("/ping", pingRouter)
}