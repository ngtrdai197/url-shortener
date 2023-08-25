package config

import (
	"context"

	"github.com/go-playground/validator/v10"
	"github.com/spf13/viper"
)

type Config struct {
	TeleBotAddress string `mapstructure:"TELE_BOT_ADDRESS" validate:"required"`
	TeleBotToken   string `mapstructure:"TELEGRAM_BOT_TOKEN" validate:"required"`
	TeleBotChatId  string `mapstructure:"TELEGRAM_CHAT_ID" validate:"required"`
}

func GetConfig(validator *validator.Validate) (*Config, error) {
	c := &Config{
		TeleBotAddress: viper.GetString("TELE_BOT_ADDRESS"),
		TeleBotToken:   viper.GetString("TELEGRAM_BOT_TOKEN"),
		TeleBotChatId:  viper.GetString("TELEGRAM_CHAT_ID"),
	}
	if err := validator.StructCtx(context.Background(), c); err != nil {
		return nil, err
	}
	return c, nil
}
