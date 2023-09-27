package config

import (
	"context"

	"github.com/go-playground/validator/v10"
	"github.com/spf13/viper"
)

type Config struct {
	PublicApiAddress    string `mapstructure:"PUBLIC_API_ADDRESS" validate:"required"`
	DbDriver            string `mapstructure:"DB_DRIVER" validate:"required"`
	DbSource            string `mapstructure:"DB_SOURCE" validate:"required"`
	MigrationUrl        string `mapstructure:"MIGRATION_URL" validate:"required"`
	KafkaBrokers        string `mapstructure:"KAFKA_BROKERS" validate:"required"`
	KafkaConsumerGroup  string `mapstructure:"KAFKA_CONSUMER_GROUP" validate:"required"`
	KafkaTopicCreateUrl string `mapstructure:"KAFKA_TOPIC_CREATE_URL" validate:"required"`
}

func GetConfig(validator *validator.Validate) (*Config, error) {
	c := &Config{
		PublicApiAddress:    viper.GetString("PUBLIC_API_ADDRESS"),
		DbDriver:            viper.GetString("DB_DRIVER"),
		DbSource:            viper.GetString("DB_SOURCE"),
		MigrationUrl:        viper.GetString("MIGRATION_URL"),
		KafkaBrokers:        viper.GetString("KAFKA_BROKERS"),
		KafkaConsumerGroup:  viper.GetString("KAFKA_CONSUMER_GROUP"),
		KafkaTopicCreateUrl: viper.GetString("KAFKA_TOPIC_CREATE_URL"),
	}
	if err := validator.StructCtx(context.Background(), c); err != nil {
		return nil, err
	}
	return c, nil
}
