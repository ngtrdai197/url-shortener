package api

import (
	"database/sql"
	"errors"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
	db "github.com/ngtrdai197/url-shortener/db/sqlc"
	"github.com/ngtrdai197/url-shortener/pkg/token"
	util "github.com/ngtrdai197/url-shortener/utils"
	"github.com/rs/zerolog/log"
)

type createUserRequest struct {
	Username string `json:"username"  binding:"required,alphanum"`
	Password string `json:"password"  binding:"required"`
	FullName string `json:"full_name" binding:"required"`
}

type userResponse struct {
	UserID    int64     `json:"id"`
	Username  string    `json:"username"`
	FullName  string    `json:"full_name"`
	CreatedAt time.Time `json:"created_at"`
}

func newUserResponse(user db.User) userResponse {
	return userResponse{
		UserID:    user.ID,
		Username:  user.Username,
		FullName:  user.FullName,
		CreatedAt: user.CreatedAt,
	}
}

func (server *Server) createUser(ctx *gin.Context) {
	var req createUserRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		returnGinError(ctx, http.StatusBadRequest, transformApiResponse(badRequestCode, requestBodyInvalid, nil, errorResponse(err)))
		return
	}
	fmt.Print(req)
	hashedPassword, err := util.HashPassword(req.Password)
	if err != nil {
		log.Err(err).Msg("createUser.HashPassword occurs error")
		returnGinError(ctx, http.StatusInternalServerError, transformApiResponse(internalCode, somethingWentWrong, nil, errorResponse(err)))
		return
	}

	arg := db.CreateUserParams{
		Username:       req.Username,
		HashedPassword: hashedPassword,
		FullName:       req.FullName,
	}
	user, err := server.store.CreateUser(ctx, arg)
	if err != nil {
		if pgError, ok := err.(*pq.Error); ok {
			log.Err(err).Msgf("PG Error: %v", pgError.Code.Name())
			switch pgError.Code.Name() {
			case "unique_violation":
				returnGinError(ctx, http.StatusForbidden, transformApiResponse(forbiddenCode, "username already created", nil, errorResponse(err)))
				return
			}
		}
		returnGinError(ctx, http.StatusInternalServerError, transformApiResponse(internalCode, somethingWentWrong, nil, errorResponse(err)))
		return
	}
	ctx.JSON(http.StatusOK, transformApiResponse(successCode, "create new user successfully", newUserResponse(user), nil))
}

func (s *Server) getProfile(ctx *gin.Context) {
	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)

	user, err := s.store.GetUserById(ctx, authPayload.UserID)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusUnauthorized, errorResponse(errors.New("cannot get profile with this credentials")))
			return
		}
		returnGinError(ctx, http.StatusUnauthorized, somethingWentWrong)
		return
	}
	ctx.JSON(http.StatusOK, newUserResponse(user))
}
