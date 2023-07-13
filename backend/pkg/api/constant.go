package api

const (
	defaultLimit = 20
	defaultPage  = 1
)

const (
	SuccessCode              = 1
	RequestBodyInvalidCode   = 2
	CreateAccessTokenCode    = 3
	NotFoundCode             = 4
	SomethingWentWrongCode   = 5
	CredentialsCode          = 6
	CreateRefreshTokenCode   = 7
	CreateSessionCode        = 8
	VerifyRefreshTokenCode   = 9
	CannotFoundSession       = 10
	BlockSessionCode         = 11
	IncorrectSessionUserCode = 12
	MismatchedSessionCode    = 13
	RequestBindQueryCode     = 14
	RecordAlreadyExistsCode  = 15
	ExpiredSessionCode       = 16
)
