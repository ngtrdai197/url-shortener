package main

import (
	"fmt"

	"github.com/go-playground/validator/v10"
	"github.com/ngtrdai197/url-shorterner/config"
	"github.com/ngtrdai197/url-shorterner/pkg/api"
	"github.com/rs/zerolog/log"
	"github.com/spf13/viper"
)

func main() {
	viper.SetConfigFile(".env")

	err := viper.ReadInConfig()
	if err != nil {
		panic(fmt.Errorf("Fatal error config file: %w", err))
	}
	c, err := config.GetConfig(validator.New())
	if err != nil {
		panic(fmt.Errorf("config file invalidate with error: %w", err))
	}
	s := api.NewServer(c)
	if err := s.Start(c.PublicApiAddress); err != nil {
		log.Fatal().Err(err).Msg("cannot create public api")
	}
}
