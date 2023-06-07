package api

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	"github.com/ngtrdai197/url-shorterner/config"
	db "github.com/ngtrdai197/url-shorterner/db/sqlc"
	"github.com/rs/zerolog/log"
)

type Server struct {
	config *config.Config
	store  db.Store
	router *gin.Engine
}

func NewServer(c *config.Config) *Server {
	conn, err := sql.Open(c.DbDriver, c.DbSource)
	if err != nil {
		log.Fatal().Err(err).Msg("cannot connect db")
	}
	store := db.NewStore(conn)
	server := &Server{config: c, store: store}
	server.setupRouter(c)

	return server
}

func (s *Server) setupRouter(c *config.Config) {
	gin.SetMode((gin.ReleaseMode))
	r := gin.Default()
	gin.DebugPrintRouteFunc = func(httpMethod, absolutePath, handlerName string, nuHandlers int) {
		log.Printf("endpoint %v %v %v %v", httpMethod, absolutePath, handlerName, nuHandlers)
	}

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	r.POST("/url", s.CreateUrl)
	r.GET("/r", s.RedirectUrl)

	s.router = r
}

func (s *Server) Start(address string) error {
	return s.router.Run(address)
}

func errorResponse(err error) gin.H {
	return gin.H{"error": err.Error()}
}
