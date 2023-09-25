package main

import (
	"fmt"

	"github.com/go-playground/validator/v10"
	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/ngtrdai197/url-shortener/config"
	"github.com/ngtrdai197/url-shortener/pkg/api"
	"github.com/ngtrdai197/url-shortener/pkg/grpc/pb"
	"github.com/rs/zerolog/log"
	"github.com/spf13/viper"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func main() {
	// load config
	c := loadConfig()
	// migration runs
	migration(c)

	conn, err := grpc.Dial("auth_service:5555", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatal().Err(err)
	}
	client := pb.NewUserServiceClient(conn)
	s := api.NewServer(c, client)

	log.Info().Msgf("listening and serving HTTP on %s", c.PublicApiAddress)
	if err := s.Start(c.PublicApiAddress); err != nil {
		log.Fatal().Err(err).Msg("cannot create public api")
	}
}

func loadConfig() *config.Config {
	viper.SetConfigFile(".env")

	err := viper.ReadInConfig()
	if err != nil {
		panic(fmt.Errorf("fatal error config file: %w", err))
	}
	c, err := config.GetConfig(validator.New())
	if err != nil {
		panic(fmt.Errorf("config file invalidate with error: %w", err))
	}
	return c
}

func migration(c *config.Config) {
	m, err := migrate.New(c.MigrationUrl, c.DbSource)
	if err != nil {
		log.Fatal().Err(err).Msg("cannot create new migrate instance")
	}

	if err = m.Up(); err != nil && err != migrate.ErrNoChange {
		log.Fatal().Err(err).Msg("failed to run migrate up")
	}

	log.Info().Msg("db migrated successfully")
}
