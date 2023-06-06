package api

import (
	"database/sql"
	"encoding/base64"
	"fmt"
	"math/big"
	"net/http"
	"time"

	"github.com/bwmarrin/snowflake"
	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
	db "github.com/ngtrdai197/url-shorterner/db/sqlc"
	"github.com/rs/zerolog/log"
)

type createUrlRequest struct {
	LongUrl string `json:"long_url" binding:"required"`
}

type rediectUrlRequest struct {
	ShortUrl string `form:"v" binding:"required"`
}

type urlResponse struct {
	Id        int64     `json:"id"`
	ShortUrl  string    `json:"short_url"`
	LongUrl   string    `json:"long_url"`
	CreatedAt time.Time `json:"created_at"`
}

func newUrlResponse(url db.Url) urlResponse {
	return urlResponse{
		Id:        url.ID,
		ShortUrl:  url.ShortUrl,
		LongUrl:   url.LongUrl,
		CreatedAt: url.CreatedAt,
	}
}

func (s *Server) CreateUrl(ctx *gin.Context) {
	var req createUrlRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	found, err := s.store.GetUrlByLong(ctx, req.LongUrl)
	if err == nil {
		ctx.JSON(http.StatusOK, newUrlResponse(found))
		return
	}

	if err == sql.ErrNoRows {
		node, err := snowflake.NewNode(97)
		if err != nil {
			log.Panic().Msgf("new node error=%v", err)
		}
		ID := node.Generate().Int64()

		arg := db.CreateUrlParams{
			ID:       ID,
			ShortUrl: base64.RawURLEncoding.EncodeToString(big.NewInt(int64(ID)).Bytes()),
			LongUrl:  req.LongUrl,
		}
		url, _ := s.store.CreateUrl(ctx, arg)

		response := newUrlResponse(url)
		ctx.JSON(http.StatusOK, response)
		return
	}
	ctx.JSON(http.StatusInternalServerError, errorResponse(err))
}

func (s *Server) RedirectUrl(ctx *gin.Context) {
	var req rediectUrlRequest

	if err := ctx.ShouldBindQuery(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))

		return
	}
	fmt.Printf("value %v", req)
	url, err := s.store.GetUrlByShort(ctx, req.ShortUrl)
	if err != nil {
		if pqErr, ok := err.(*pq.Error); ok {
			ctx.JSON(http.StatusInternalServerError, errorResponse(pqErr))
		}
		ctx.JSON(http.StatusNotFound, errorResponse(err))
	}
	fmt.Printf("result %v", url)

	http.Redirect(ctx.Writer, ctx.Request, url.LongUrl, http.StatusSeeOther)
}
