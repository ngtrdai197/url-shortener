package api

const (
	somethingWentWrongMsg  = "something went wrong"
	requestBodyInvalidMsg  = "request body is invalid"
	requestQueryInvalidMsg = "request query is invalid"
)

type apiResponse struct {
	ResultCode uint        `json:"result_code"`
	Message    string      `json:"message"`
	Data       interface{} `json:"data"`
}

func transformApiResponse(resultCode uint, message string, data interface{}) *apiResponse {
	return &apiResponse{
		ResultCode: resultCode,
		Message:    message,
		Data:       data,
	}
}
