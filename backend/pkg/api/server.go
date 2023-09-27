package api

import (
	"database/sql"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	"github.com/ngtrdai197/url-shortener/config"
	db "github.com/ngtrdai197/url-shortener/db/sqlc"
	"github.com/ngtrdai197/url-shortener/pkg/grpc/pb"
	"github.com/ngtrdai197/url-shortener/pkg/kafka"
	"github.com/rs/zerolog/log"
)

type Server struct {
	config      *config.Config
	store       db.Store
	router      *gin.Engine
	userService pb.UserServiceClient
	kp          *kafka.Producer
}

// NewServer creates a new server instance with the given configuration and user service client.
//
// Parameters:
// - c: a pointer to the config.Config struct representing the server configuration.
// - client: the client for the UserService gRPC service.
//
// Returns:
// - server: a pointer to the Server struct representing the created server instance.
func NewServer(c *config.Config, client pb.UserServiceClient) *Server {
	conn, err := sql.Open(c.DbDriver, c.DbSource)
	if err != nil {
		log.Fatal().Err(err).Msg("cannot connect db")
	}

	store := db.NewStore(conn)
	kp := kafka.NewProducer(strings.Split(c.KafkaBrokers, ","), c)
	server := &Server{config: c, store: store, userService: client, kp: kp}
	server.setupRouter()

	return server
}

func (s *Server) setupRouter() {
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()
	gin.DebugPrintRouteFunc = func(httpMethod, absolutePath, handlerName string, nuHandlers int) {
		log.Printf("endpoint %v %v %v %v", httpMethod, absolutePath, handlerName, nuHandlers)
	}
	r.Use(corsMiddleware())

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	r.GET("/r", s.RedirectUrl)

	authenticatedRoutes := r.Group("/")
	authenticatedRoutes.Use(authMiddleware())
	{
		authenticatedRoutes.POST("/urls", s.CreateUrl)
		authenticatedRoutes.GET("/urls", s.GetListURLsOfUser)
		authenticatedRoutes.GET("/all-urls", s.GetListURLs)
	}

	s.router = r
}

func (s *Server) Start(address string) error {
	return s.router.Run(address)
}

func errorResponse(err error) gin.H {
	return gin.H{"error": err.Error()}
}

func returnGinError(ctx *gin.Context, httpErrorCode int, err interface{}) {
	ctx.JSON(httpErrorCode, err)
}
