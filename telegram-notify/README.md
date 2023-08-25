# Telegram Notify

Telegram Notify will be a service for the purpose of consuming events published from kafka (backend service), which will receive event types like (error, warning, etc...).
And finally will send a message to the telegram bot for the purpose of easily identifying when there is an error.

This is just a small service for illustration

## Create .env file

```bash
cp .env.example .env
```

```bash
# Run to test push msg
go run main.go "Hello from Golang 🤷"
```

<strong>WIP</strong>