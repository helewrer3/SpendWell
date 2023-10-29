package categories

import (
	"github.com/go-chi/chi/v5"
)

func initRoutes(categoriesRouter *chi.Mux){
	categoriesRouter.Post("/", createCategory)
	categoriesRouter.Get("/{userId:[0-9a-f\\-]+}", getCategories)
	categoriesRouter.Get("/{id:[0-9a-f\\-]+}", getCategory)
	categoriesRouter.Put("/{id:[0-9a-f\\-]+}", updateCategory)
	categoriesRouter.Delete("/{id:[0-9a-f\\-]+}", deleteCategory)
}

func Init(router *chi.Mux){
	categoriesRouter := chi.NewRouter()
	initRoutes(categoriesRouter)
	router.Mount("/categories", categoriesRouter)
}