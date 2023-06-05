# Url Shorterner :tada:

Build a service for shortening url, idea will generate a unique ID (Twitter snowflake) and convert that unique id (base 10) to base 64

- Backend: Golang (1.20)
- Frontend: ReactJs (18.2.0)

## Generate shortened url

```bash
# Create
curl --location 'http://localhost:8088/url' \
--header 'Content-Type: application/json' \
--data '{
    "long_url": "https://www.youtube.com/watch?v=vC4dLeqnvAw&ab_channel=SeanStudy"
}'
```

```json
// Response
{
  "id": 1665817125203611648,
  "short_url": "Fx4r2XiGEAA",
  "long_url": "https://www.youtube.com/watch?v=vC4dLeqnvAw&ab_channel=SeanStudy",
  "created_at": "2023-06-05T20:25:26.708125Z"
}
```

```bash
# Redirect
localhost:8088/r?v=Fx4r2XiGEAA
```

## The project is still in progress (WIP :rocket:)
