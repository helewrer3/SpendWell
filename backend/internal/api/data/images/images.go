package images

import (
	"github.com/go-chi/chi/v5"
)

func initRoutes(imagesRouter *chi.Mux){
	imagesRouter.Get("/", getImagesMetaData)
	imagesRouter.Post("/", getImage)
	imagesRouter.Get("/{id:[0-9a-f\\-]+}", getImageMetaData)
}

func Init(router *chi.Mux){
	imagesRouter := chi.NewRouter()
	initRoutes(imagesRouter)
	router.Mount("/images", imagesRouter)
}