package accounts

import "github.com/go-chi/chi/v5"

func initRoutes(accountsRouter *chi.Mux){
	accountsRouter.Post("/", createAccount)
	accountsRouter.Get("/user/{id:[0-9a-f\\-]+}", getAccounts)
	accountsRouter.Get("/{id:[0-9a-f\\-]+}", getAccount)
	accountsRouter.Put("/{id:[0-9a-f\\-]+}", updateAccount)
	accountsRouter.Delete("/{id:[0-9a-f\\-]+}", deleteAccount)
}

func Init(router *chi.Mux){
	accountsRouter := chi.NewRouter()
	initRoutes(accountsRouter)
	router.Mount("/accounts", accountsRouter)	
}