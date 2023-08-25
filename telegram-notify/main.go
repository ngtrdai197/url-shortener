package main

import (
	"fmt"
	"os"
	"telegram-notify/config"
	"telegram-notify/pkg/logger"

	"github.com/go-playground/validator/v10"
	"github.com/spf13/viper"
)

func main() {
	cf := loadConfig()
	log := logger.New(cf)
	args := os.Args
	fmt.Println("Start send msg to telegram ...")
	log.SendTelegramMessage(args[1])
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
