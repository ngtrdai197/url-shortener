// Code generated by sqlc. DO NOT EDIT.

package db

import (
	"time"
)

type Url struct {
	ID        int64     `json:"id"`
	ShortUrl  string    `json:"short_url"`
	LongUrl   string    `json:"long_url"`
	CreatedAt time.Time `json:"created_at"`
}
