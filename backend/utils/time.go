package util

import (
	"time"

	"github.com/golang/protobuf/ptypes/timestamp"
)

func ConvertTimestampToTime(ts *timestamp.Timestamp) time.Time {
	if ts == nil {
		return time.Time{}
	}

	return time.Unix(ts.GetSeconds(), int64(ts.GetNanos()))
}
