package api

import "net/http"

const (
	successCode      = http.StatusOK
	badRequestCode   = http.StatusBadRequest
	notFoundCode     = http.StatusNotFound
	internalCode     = http.StatusInternalServerError
	unauthorizedCode = http.StatusUnauthorized
	forbiddenCode    = http.StatusForbidden
)

const (
	somethingWentWrong  = "something went wrong"
	requestBodyInvalid  = "request body is invalid"
	requestQueryInvalid = "request query is invalid"
)

type apiResponse struct {
	ResultCode  int         `json:"result_code"`
	Message     string      `json:"message"`
	Data        interface{} `json:"data"`
	ErrorDetail interface{} `json:"error_detail"`
}

func transformApiResponse(resultCode int, message string, data interface{}, errorDetail interface{}) *apiResponse {
	return &apiResponse{
		ResultCode:  resultCode,
		Message:     message,
		Data:        data,
		ErrorDetail: errorDetail,
	}
}
