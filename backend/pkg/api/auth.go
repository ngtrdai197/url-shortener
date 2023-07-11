package api

import (
	"database/sql"
	"errors"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	db "github.com/ngtrdai197/url-shortener/db/sqlc"
	util "github.com/ngtrdai197/url-shortener/utils"
	"github.com/rs/zerolog/log"
)

type loginUserRequest struct {
	Username string `json:"username" binding:"required,alphanum"`
	Password string `json:"password" binding:"required,min=6"`
}

type loginUserResponse struct {
	SessionID             uuid.UUID    `json:"session_id"`
	AccessToken           string       `json:"access_token"`
	AccessTokenExpiresAt  time.Time    `json:"access_token_expires_at"`
	RefreshToken          string       `json:"refresh_token"`
	RefreshTokenExpiresAt time.Time    `json:"refresh_token_expires_at"`
	User                  userResponse `json:"user"`
}

type renewAccessTokenRequest struct {
	RefreshToken string `json:"refresh_token" binding:"required"`
}

type renewAccessTokenResponse struct {
	AccessToken          string    `json:"access_token"`
	AccessTokenExpiresAt time.Time `json:"access_token_expires_at"`
}

func (server *Server) loginUser(ctx *gin.Context) {
	var req loginUserRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		returnGinError(ctx, http.StatusBadRequest, transformApiResponse(badRequestCode, requestBodyInvalid, nil, errorResponse(err)))
		return
	}

	user, err := server.store.GetUser(ctx, req.Username)

	credentialsMsg := "credentials username or password incorrect"
	credentialsError := errors.New(credentialsMsg)

	if err != nil {
		if err == sql.ErrNoRows {
			returnGinError(ctx, http.StatusBadRequest, transformApiResponse(badRequestCode, "cannot found user", nil, errorResponse(credentialsError)))
			return
		}
		returnGinError(ctx, http.StatusInternalServerError, transformApiResponse(internalCode, somethingWentWrong, nil, errorResponse(credentialsError)))
		return
	}

	err = util.CheckPassword(req.Password, user.HashedPassword)
	if err != nil {
		returnGinError(ctx, http.StatusBadRequest, transformApiResponse(badRequestCode, credentialsMsg, nil, errorResponse(credentialsError)))
		return
	}

	accessToken, accessPayload, err := server.tokenMaker.CreateToken(
		user.ID,
		server.config.AccessTokenDuration,
	)
	if err != nil {
		returnGinError(ctx, http.StatusInternalServerError, transformApiResponse(internalCode, "create access token occurs error", nil, errorResponse(err)))
		return
	}

	refreshToken, refreshPayload, err := server.tokenMaker.CreateToken(
		user.ID,
		server.config.RefreshTokenDuration,
	)
	if err != nil {
		returnGinError(ctx, http.StatusInternalServerError, transformApiResponse(internalCode, "create refresh token occurs error", nil, errorResponse(err)))
		return
	}

	session, err := server.store.CreateSession(ctx, db.CreateSessionParams{
		ID:           refreshPayload.ID,
		UserID:       user.ID,
		RefreshToken: refreshToken,
		IsBlocked:    false,
		ExpiresAt:    refreshPayload.ExpiredAt,
	})
	if err != nil {
		returnGinError(ctx, http.StatusInternalServerError, transformApiResponse(internalCode, "create session occurs error", nil, errorResponse(err)))
		return
	}

	rsp := loginUserResponse{
		SessionID:             session.ID,
		AccessToken:           accessToken,
		AccessTokenExpiresAt:  accessPayload.ExpiredAt,
		RefreshToken:          refreshToken,
		RefreshTokenExpiresAt: refreshPayload.ExpiredAt,
		User:                  newUserResponse(user),
	}
	ctx.JSON(http.StatusOK, transformApiResponse(successCode, "login successfully", rsp, nil))
}

func (server *Server) renewAccessToken(ctx *gin.Context) {
	var req renewAccessTokenRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		returnGinError(ctx, http.StatusBadRequest, transformApiResponse(badRequestCode, requestBodyInvalid, nil, errorResponse(err)))
		return
	}

	refreshPayload, err := server.tokenMaker.VerifyToken(req.RefreshToken)
	if err != nil {
		returnGinError(ctx, http.StatusUnauthorized, transformApiResponse(unauthorizedCode, "verify refresh token occurs error", nil, errorResponse(err)))
		return
	}

	session, err := server.store.GetSession(ctx, refreshPayload.ID)
	if err != nil {
		if err == sql.ErrNoRows {
			log.Err(err).Msg("renewAccessToken.GetSession cannot found session")
			returnGinError(ctx, http.StatusNotFound, transformApiResponse(unauthorizedCode, "cannot found session", nil, errorResponse(fmt.Errorf("session is not found"))))
			return
		}
		returnGinError(ctx, http.StatusInternalServerError, transformApiResponse(internalCode, somethingWentWrong, nil, errorResponse(err)))
		return
	}

	if session.IsBlocked {
		msg := "blocked session"
		returnGinError(ctx, http.StatusUnauthorized, transformApiResponse(unauthorizedCode, msg, nil, errorResponse(fmt.Errorf(msg))))
		return
	}

	if session.UserID != refreshPayload.UserID {
		msg := "incorrect session user"
		returnGinError(ctx, http.StatusUnauthorized, transformApiResponse(unauthorizedCode, msg, nil, errorResponse(fmt.Errorf(msg))))
		return
	}

	if session.RefreshToken != req.RefreshToken {
		msg := "mismatched session token"
		returnGinError(ctx, http.StatusUnauthorized, transformApiResponse(unauthorizedCode, msg, nil, errorResponse(fmt.Errorf(msg))))
		return
	}

	if time.Now().After(session.ExpiresAt) {
		msg := "expired session"
		returnGinError(ctx, http.StatusUnauthorized, transformApiResponse(unauthorizedCode, msg, nil, errorResponse(fmt.Errorf(msg))))
		return
	}

	accessToken, accessPayload, err := server.tokenMaker.CreateToken(
		refreshPayload.UserID,
		server.config.AccessTokenDuration,
	)
	if err != nil {
		returnGinError(ctx, http.StatusInternalServerError, transformApiResponse(internalCode, somethingWentWrong, nil, errorResponse(err)))
		return
	}

	rsp := renewAccessTokenResponse{
		AccessToken:          accessToken,
		AccessTokenExpiresAt: accessPayload.ExpiredAt,
	}
	ctx.JSON(http.StatusOK, transformApiResponse(successCode, "renew access token successfully", rsp, nil))
}
