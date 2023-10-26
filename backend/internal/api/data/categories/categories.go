package categories

import (
	"github.com/go-chi/chi/v5"
)

func initRoutes(categoriesRouter *chi.Mux){
	categoriesRouter.Get("/", getCategories)
	categoriesRouter.Delete("/{id:[0-9a-f\\-]+}", deleteCategory)
	categoriesRouter.Post("/", createCategory)
	categoriesRouter.Put("/{id:[0-9a-f\\-]+}", updateCategory)
}

func InitImages(router *chi.Mux){
	categoriesRouter := chi.NewRouter()
	initRoutes(categoriesRouter)
	router.Mount("/categories", categoriesRouter)
}