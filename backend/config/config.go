package config

import (
	"context"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/spf13/viper"
)

type Config struct {
	PublicApiAddress     string        `mapstructure:"PUBLIC_API_ADDRESS" validate:"required"`
	DbDriver             string        `mapstructure:"DB_DRIVER" validate:"required"`
	DbSource             string        `mapstructure:"DB_SOURCE" validate:"required"`
	MigrationUrl         string        `mapstructure:"MIGRATION_URL" validate:"required"`
	AccessTokenDuration  time.Duration `mapstructure:"ACCESS_TOKEN_DURATION"`
	RefreshTokenDuration time.Duration `mapstructure:"REFRESH_TOKEN_DURATION"`
	PrivateKey           string        `mapstructure:"PRIVATE_KEY" validate:"required"`
	PublicKey            string        `mapstructure:"PUBLIC_KEY" validate:"required"`
}

func GetConfig(validator *validator.Validate) (*Config, error) {
	c := &Config{
		PublicApiAddress:     viper.GetString("PUBLIC_API_ADDRESS"),
		DbDriver:             viper.GetString("DB_DRIVER"),
		DbSource:             viper.GetString("DB_SOURCE"),
		MigrationUrl:         viper.GetString("MIGRATION_URL"),
		AccessTokenDuration:  viper.GetDuration("ACCESS_TOKEN_DURATION"),
		RefreshTokenDuration: viper.GetDuration("REFRESH_TOKEN_DURATION"),
		PrivateKey:           viper.GetString("PRIVATE_KEY"),
		PublicKey:            viper.GetString("PUBLIC_KEY"),
	}
	if err := validator.StructCtx(context.Background(), c); err != nil {
		return nil, err
	}
	return c, nil
}
