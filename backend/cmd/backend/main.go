package main

import (
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/helewrer3/SpendWell/backend/internal/api/auth"
	"github.com/helewrer3/SpendWell/backend/internal/api/data/accounts"
	"github.com/helewrer3/SpendWell/backend/internal/api/data/categories"
	"github.com/helewrer3/SpendWell/backend/internal/api/data/images"
	"github.com/helewrer3/SpendWell/backend/internal/api/data/records"
	"github.com/helewrer3/SpendWell/backend/internal/api/data/transactionTypes"
	"github.com/helewrer3/SpendWell/backend/internal/api/ping"
	"github.com/helewrer3/SpendWell/backend/internal/sql"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()

	sql.InitSQL()
	
	router := chi.NewRouter()
	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)
	router.Use(cors.AllowAll().Handler)

	ping.Init(router)
	auth.Init(router)
	images.Init(router)
	categories.Init(router)
	accounts.Init(router)
	transactionTypes.Init(router)
	records.Init(router)

	http.ListenAndServe(":" + os.Getenv("PORT"), router)
}