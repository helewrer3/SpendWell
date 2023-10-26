package auth

import (
	"github.com/go-chi/chi/v5"
)

func initRoutes(authRouter *chi.Mux){
	authRouter.Post("/", createUser)
	authRouter.Get("/", verifyUser)
	authRouter.Get("/{id:[0-9a-f\\-]+}", getUser)
}

func InitAuth(router *chi.Mux){
	authRouter := chi.NewRouter()
	initRoutes(authRouter)
	router.Mount("/auth", authRouter)
}