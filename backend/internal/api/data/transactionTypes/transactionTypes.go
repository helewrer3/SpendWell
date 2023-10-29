package transactionTypes

import "github.com/go-chi/chi/v5"

func initRoutes(transactionTypesRouter *chi.Mux){
	transactionTypesRouter.Get("/", getTransactionTypes)
	transactionTypesRouter.Get("/{id:[0-9a-f\\-]+}", getTransactionType)
}

func Init(router *chi.Mux){
	transactionTypesRouter := chi.NewRouter()
	initRoutes(transactionTypesRouter)
	router.Mount("/transactionTypes", transactionTypesRouter)	
}