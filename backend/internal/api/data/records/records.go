package records

import "github.com/go-chi/chi/v5"

func initRoutes(recordsRouter *chi.Mux){
	recordsRouter.Post("/", createRecord)
	recordsRouter.Get("/{userId:[0-9a-f\\-]+}", getRecords)
	recordsRouter.Get("/{id:[0-9a-f\\-]+}", getRecord)
	recordsRouter.Put("/{id:[0-9a-f\\-]+}", updateRecord)
	recordsRouter.Delete("/{id:[0-9a-f\\-]+}", deleteRecord)
}

func Init(router *chi.Mux){
	recordsRouter := chi.NewRouter()
	initRoutes(recordsRouter)
	router.Mount("/records", recordsRouter)
}