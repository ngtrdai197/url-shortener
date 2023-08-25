package logger

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"telegram-notify/config"
)

type Logger struct {
	config *config.Config
}

func New(c *config.Config) *Logger {
	return &Logger{
		config: c,
	}
}

func (l *Logger) getTelegramUrl() string {
	return fmt.Sprintf("https://api.telegram.org/bot%s", l.config.TeleBotToken)
}

func (l *Logger) SendTelegramMessage(message string) error {
	var response *http.Response

	url := l.getTelegramUrl() + "/sendMessage"

	body, _ := json.Marshal(map[string]string{
		"text":    message,
		"chat_id": l.config.TeleBotChatId,
	})

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(body))
	if err != nil {
		return err
	}
	req.Header.Add("Content-Type", "application/json")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return err
	}
	response = resp

	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
		return fmt.Errorf("status code error: %d %s", response.StatusCode, response.Status)
	}

	resBody, err := io.ReadAll(response.Body)
	if err != nil {
		return err
	}

	log.Default().Println(string(resBody))

	return nil
}
