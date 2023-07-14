package token

import (
	"crypto/ed25519"
	"encoding/hex"
	"time"

	"github.com/ngtrdai197/url-shortener/config"

	"github.com/o1egl/paseto"
)

// PasetoMaker is a PASETO token maker
type PasetoMaker struct {
	paseto     *paseto.V2
	privateKey ed25519.PrivateKey
	publicKey  ed25519.PublicKey
}

// NewPasetoMaker creates a new PasetoMaker
func NewPasetoMaker(c *config.Config) (Maker, error) {
	decodedPrivateKey, _ := hex.DecodeString(c.PrivateKey)
	decodedPublicKey, _ := hex.DecodeString(c.PublicKey)

	maker := &PasetoMaker{
		paseto:     paseto.NewV2(),
		privateKey: ed25519.PrivateKey(decodedPrivateKey),
		publicKey:  ed25519.PublicKey(decodedPublicKey),
	}

	return maker, nil
}

// CreateToken creates a new token for a specific username and duration
func (maker *PasetoMaker) CreateToken(
	userId int64,
	duration time.Duration,
) (string, *Payload, error) {
	payload, err := NewPayload(userId, duration)
	if err != nil {
		return "", payload, err
	}

	token, err := maker.paseto.Sign(maker.privateKey, payload, nil)
	return token, payload, err
}

// VerifyToken checks if the token is valid or not
func (maker *PasetoMaker) VerifyToken(token string) (*Payload, error) {
	payload := &Payload{}

	err := maker.paseto.Verify(token, maker.publicKey, payload, nil)
	if err != nil {
		return nil, ErrInvalidToken
	}

	err = payload.Valid()
	if err != nil {
		return nil, err
	}

	return payload, nil
}
