// Code generated by sqlc. DO NOT EDIT.

package db

import (
	"database/sql"
	"time"
)

type Url struct {
	ID          int64          `json:"id"`
	ShortUrl    string         `json:"short_url"`
	LongUrl     string         `json:"long_url"`
	CreatedAt   time.Time      `json:"created_at"`
	UserID      int64          `json:"user_id"`
	Description sql.NullString `json:"description"`
}
