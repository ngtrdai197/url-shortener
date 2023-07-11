package api

import (
	"database/sql"
	"errors"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
	db "github.com/ngtrdai197/url-shortener/db/sqlc"
	"github.com/ngtrdai197/url-shortener/pkg/token"
	util "github.com/ngtrdai197/url-shortener/utils"
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
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}
	hashedPassword, err := util.HashPassword(req.Password)
	if err != nil {
		ginInternalError(ctx, err)
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
			log.Printf("PG Error: %v", pgError.Code.Name())
			switch pgError.Code.Name() {
			case "unique_violation":
				ctx.JSON(http.StatusForbidden, errorResponse(err))
				return
			}
		}
		ginInternalError(ctx, err)
		return
	}
	response := newUserResponse(user)
	ctx.JSON(http.StatusOK, response)
}

func (s *Server) getProfile(ctx *gin.Context) {
	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)

	user, err := s.store.GetUserById(ctx, authPayload.UserID)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusUnauthorized, errorResponse(errors.New("cannot get profile with this credentials")))
			return
		}
		ginInternalError(ctx, err)
		return
	}
	ctx.JSON(http.StatusOK, newUserResponse(user))
}
