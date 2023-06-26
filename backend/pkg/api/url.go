package api

import (
	"database/sql"
	"encoding/base64"
	"math/big"
	"net/http"
	"time"

	"github.com/bwmarrin/snowflake"
	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
	db "github.com/ngtrdai197/url-shortener/db/sqlc"
	"github.com/ngtrdai197/url-shortener/pkg/token"
	"github.com/rs/zerolog/log"
)

type createUrlRequest struct {
	LongUrl     string `json:"long_url" binding:"required"`
	Description string `json:"description"`
}

type redirectUrlRequest struct {
	ShortUrl string `form:"v" binding:"required"`
}

type urlsUserResponse struct {
	Id          int64     `json:"id"`
	UserID      int64     `json:"user_id"`
	ShortUrl    string    `json:"short_url"`
	LongUrl     string    `json:"long_url"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"created_at"`
}
type urlsResponse struct {
	Id          int64        `json:"id"`
	User        userResponse `json:"user"`
	ShortUrl    string       `json:"short_url"`
	LongUrl     string       `json:"long_url"`
	Description string       `json:"description"`
	CreatedAt   time.Time    `json:"created_at"`
}

type getListUrlRequest struct {
	Limit int `form:"limit"`
	Page  int `form:"page"`
}

type paginateData struct {
	Limit int   `json:"limit"`
	Page  int   `json:"page"`
	Total int64 `json:"total"`
}

type getListURLsUserResponse struct {
	Paginate paginateData       `json:"paginate"`
	Data     []urlsUserResponse `json:"data"`
}
type getListURLsResponse struct {
	Paginate paginateData   `json:"paginate"`
	Data     []urlsResponse `json:"data"`
}

type baseUrlResponse struct {
	Id          int64     `json:"id"`
	UserID      int64     `json:"user_id"`
	ShortUrl    string    `json:"short_url"`
	LongUrl     string    `json:"long_url"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"created_at"`
}

func newBaseUrlResponse(url db.Url) baseUrlResponse {
	return baseUrlResponse{
		Id:          url.ID,
		UserID:      url.UserID,
		ShortUrl:    url.ShortUrl,
		LongUrl:     url.LongUrl,
		CreatedAt:   url.CreatedAt,
		Description: url.Description.String,
	}
}
func newURLUserResponse(url db.GetListURLsOfUserRow) urlsResponse {
	user := userResponse{
		UserID:    url.UserID,
		Username:  url.UserUsername,
		FullName:  url.UserFullName,
		CreatedAt: url.UserCreatedAt,
	}
	return urlsResponse{
		Id:          url.ID,
		User:        user,
		ShortUrl:    url.ShortUrl,
		LongUrl:     url.LongUrl,
		CreatedAt:   url.CreatedAt,
		Description: url.Description.String,
	}
}
func newUrlResponse(url db.GetListURLsRow) urlsResponse {
	user := userResponse{
		UserID:    url.UserID,
		Username:  url.UserUsername,
		FullName:  url.UserFullName,
		CreatedAt: url.UserCreatedAt,
	}
	return urlsResponse{
		Id:          url.ID,
		User:        user,
		ShortUrl:    url.ShortUrl,
		LongUrl:     url.LongUrl,
		CreatedAt:   url.CreatedAt,
		Description: url.Description.String,
	}
}

func (s *Server) CreateUrl(ctx *gin.Context) {
	var req createUrlRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}
	foundUrl, err := s.store.GetUrlByLong(ctx, req.LongUrl)
	if err == nil {
		ctx.JSON(http.StatusOK, newBaseUrlResponse(foundUrl))
		return
	}

	if err != sql.ErrNoRows {
		ginInternalError(ctx, err)
		return
	}

	node, err := snowflake.NewNode(97)
	if err != nil {
		log.Error().Msgf("new node error=%v", err)
		ginInternalError(ctx, err)
		return
	}

	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
	id := node.Generate().Int64()

	// Encode the ID as a base64 string to make it shorter.
	shortUrl := base64.RawURLEncoding.EncodeToString(big.NewInt(int64(id)).Bytes())
	arg := db.CreateUrlParams{
		ID:          id,
		ShortUrl:    shortUrl,
		LongUrl:     req.LongUrl,
		UserID:      authPayload.UserID,
		Description: sql.NullString{String: req.Description, Valid: true},
	}
	createdUrl, err := s.store.CreateUrl(ctx, arg)
	if err != nil {
		log.Error().Msgf("create url with error=%v", err)
		ginInternalError(ctx, err)
		return
	}

	response := newBaseUrlResponse(createdUrl)
	ctx.JSON(http.StatusOK, response)
}

func (s *Server) GetListURLsOfUser(ctx *gin.Context) {
	req := getListUrlRequest{
		Limit: defaultLimit,
		Page:  defaultPage,
	}

	if err := ctx.BindQuery(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
	urls, err := s.store.GetListURLsOfUser(ctx, db.GetListURLsOfUserParams{
		UserID: authPayload.UserID,
		Limit:  int32(req.Limit),
		Offset: int32((req.Page - 1) * req.Limit),
	})
	if err != nil && err != sql.ErrNoRows {
		if err == sql.ErrNoRows {
			urls = []db.GetListURLsOfUserRow{}
		} else {
			ginInternalError(ctx, err)
			return
		}
	}

	totalUrls, err := s.store.GetCountURLsOfUser(ctx, authPayload.UserID)
	if err != nil {
		ginInternalError(ctx, err)
		return
	}

	response := getListURLsResponse{
		Paginate: paginateData{
			Limit: req.Limit,
			Page:  req.Page,
			Total: totalUrls,
		},
	}

	data := transformListUrlToUrlResponse(urls).([]urlsResponse)
	if data != nil {
		response.Data = data
	} else {
		response.Data = []urlsResponse{}
	}
	ctx.JSON(http.StatusOK, response)
}

func (s *Server) GetListURLs(ctx *gin.Context) {
	req := getListUrlRequest{
		Limit: defaultLimit,
		Page:  defaultPage,
	}

	if err := ctx.BindQuery(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	urls, err := s.store.GetListURLs(ctx, db.GetListURLsParams{
		Limit:  int32(req.Limit),
		Offset: int32((req.Page - 1) * req.Limit),
	})
	if err != nil && err != sql.ErrNoRows {
		if err == sql.ErrNoRows {
			urls = []db.GetListURLsRow{}
		} else {
			ginInternalError(ctx, err)
			return
		}
	}

	totalUrls, err := s.store.GetCountURLs(ctx)
	if err != nil {
		ginInternalError(ctx, err)
		return
	}

	response := getListURLsResponse{
		Paginate: paginateData{
			Limit: req.Limit,
			Page:  req.Page,
			Total: totalUrls,
		},
	}

	data := transformListUrlToUrlResponse(urls).([]urlsResponse)
	if data != nil {
		response.Data = data
	} else {
		response.Data = []urlsResponse{}
	}
	ctx.JSON(http.StatusOK, response)
}

func (s *Server) RedirectUrl(ctx *gin.Context) {
	var req redirectUrlRequest

	if err := ctx.ShouldBindQuery(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	url, err := s.store.GetUrlByShort(ctx, req.ShortUrl)
	if err != nil {
		if pqErr, ok := err.(*pq.Error); ok {
			ctx.JSON(http.StatusInternalServerError, errorResponse(pqErr))
		}
		ctx.JSON(http.StatusNotFound, errorResponse(err))
	}

	http.Redirect(ctx.Writer, ctx.Request, url.LongUrl, http.StatusSeeOther)
}

func transformListUrlToUrlResponse(dbUrls interface{}) interface{} {
	switch dbUrls.(type) {

	case []db.GetListURLsOfUserRow:
		urlResponses := make([]urlsResponse, len(dbUrls.([]db.GetListURLsOfUserRow)))
		for i, row := range dbUrls.([]db.GetListURLsOfUserRow) {
			urlResponses[i] = newURLUserResponse(row)
		}
		return urlResponses

	case []db.GetListURLsRow:
		urlResponses := make([]urlsResponse, len(dbUrls.([]db.GetListURLsRow)))
		for i, row := range dbUrls.([]db.GetListURLsRow) {
			urlResponses[i] = newUrlResponse(row)
		}
		return urlResponses

	default:
		return nil // or return an error message here
	}
}
