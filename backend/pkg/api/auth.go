package api

import (
	"database/sql"
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
	SessionID             uuid.UUID `json:"session_id"`
	AccessToken           string    `json:"access_token"`
	AccessTokenExpiresAt  time.Time `json:"access_token_expires_at"`
	RefreshToken          string    `json:"refresh_token"`
	RefreshTokenExpiresAt time.Time `json:"refresh_token_expires_at"`
}

type renewAccessTokenRequest struct {
	RefreshToken string `json:"refresh_token" binding:"required"`
}

type renewAccessTokenResponse struct {
	AccessToken          string    `json:"access_token"`
	AccessTokenExpiresAt time.Time `json:"access_token_expires_at"`
}

func (s *Server) loginUser(ctx *gin.Context) {
	var req loginUserRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		returnGinError(ctx, http.StatusBadRequest, transformApiResponse(RequestBodyInvalidCode, requestBodyInvalidMsg, nil))
		return
	}

	user, err := s.store.GetUser(ctx, req.Username)

	credentialsMsg := "credentials username or password incorrect"

	if err != nil {
		if err == sql.ErrNoRows {
			returnGinError(ctx, http.StatusBadRequest, transformApiResponse(CreateAccessTokenCode, "cannot found user", nil))
			return
		}
		returnGinError(ctx, http.StatusInternalServerError, transformApiResponse(SomethingWentWrongCode, somethingWentWrongMsg, nil))
		return
	}

	err = util.CheckPassword(req.Password, user.HashedPassword)
	if err != nil {
		returnGinError(ctx, http.StatusBadRequest, transformApiResponse(CredentialsCode, credentialsMsg, nil))
		return
	}

	accessToken, accessPayload, err := s.tokenMaker.CreateToken(
		user.ID,
		s.config.AccessTokenDuration,
	)
	if err != nil {
		returnGinError(ctx, http.StatusInternalServerError, transformApiResponse(CreateAccessTokenCode, "create access token occurs error", nil))
		return
	}

	refreshToken, refreshPayload, err := s.tokenMaker.CreateToken(
		user.ID,
		s.config.RefreshTokenDuration,
	)
	if err != nil {
		returnGinError(ctx, http.StatusInternalServerError, transformApiResponse(CreateRefreshTokenCode, "create refresh token occurs error", nil))
		return
	}

	session, err := s.store.CreateSession(ctx, db.CreateSessionParams{
		ID:           refreshPayload.ID,
		UserID:       user.ID,
		RefreshToken: refreshToken,
		IsBlocked:    false,
		ExpiresAt:    refreshPayload.ExpiredAt,
	})
	if err != nil {
		returnGinError(ctx, http.StatusInternalServerError, transformApiResponse(CreateSessionCode, "create session occurs error", nil))
		return
	}

	rsp := loginUserResponse{
		SessionID:             session.ID,
		AccessToken:           accessToken,
		AccessTokenExpiresAt:  accessPayload.ExpiredAt,
		RefreshToken:          refreshToken,
		RefreshTokenExpiresAt: refreshPayload.ExpiredAt,
	}
	ctx.JSON(http.StatusOK, transformApiResponse(SuccessCode, "login successfully", rsp))
}

func (s *Server) renewAccessToken(ctx *gin.Context) {
	var req renewAccessTokenRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		returnGinError(ctx, http.StatusBadRequest, transformApiResponse(RequestBodyInvalidCode, requestBodyInvalidMsg, nil))
		return
	}

	refreshPayload, err := s.tokenMaker.VerifyToken(req.RefreshToken)
	if err != nil {
		returnGinError(ctx, http.StatusUnauthorized, transformApiResponse(VerifyRefreshTokenCode, "verify refresh token occurs error", nil))
		return
	}

	session, err := s.store.GetSession(ctx, refreshPayload.ID)
	if err != nil {
		if err == sql.ErrNoRows {
			log.Err(err).Msg("renewAccessToken.GetSession cannot found session")
			returnGinError(ctx, http.StatusNotFound, transformApiResponse(CannotFoundSession, "cannot found session", nil))
			return
		}
		returnGinError(ctx, http.StatusInternalServerError, transformApiResponse(SomethingWentWrongCode, somethingWentWrongMsg, nil))
		return
	}

	if session.IsBlocked {
		returnGinError(ctx, http.StatusUnauthorized, transformApiResponse(BlockSessionCode, "blocked session", nil))
		return
	}

	if session.UserID != refreshPayload.UserID {
		returnGinError(ctx, http.StatusUnauthorized, transformApiResponse(IncorrectSessionUserCode, "incorrect session user", nil))
		return
	}

	if session.RefreshToken != req.RefreshToken {
		returnGinError(ctx, http.StatusUnauthorized, transformApiResponse(MismatchedSessionCode, "mismatched session token", nil))
		return
	}

	if time.Now().After(session.ExpiresAt) {
		returnGinError(ctx, http.StatusUnauthorized, transformApiResponse(ExpiredSessionCode, "expired session", nil))
		return
	}

	accessToken, accessPayload, err := s.tokenMaker.CreateToken(
		refreshPayload.UserID,
		s.config.AccessTokenDuration,
	)
	if err != nil {
		returnGinError(ctx, http.StatusInternalServerError, transformApiResponse(SomethingWentWrongCode, somethingWentWrongMsg, nil))
		return
	}

	rsp := renewAccessTokenResponse{
		AccessToken:          accessToken,
		AccessTokenExpiresAt: accessPayload.ExpiredAt,
	}
	ctx.JSON(http.StatusOK, transformApiResponse(SuccessCode, "renew access token successfully", rsp))
}
