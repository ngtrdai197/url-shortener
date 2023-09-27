package kafka

import "time"

const (
	MinBytes               = 10e3 // 10KB
	MaxBytes               = 10e6 // 10MB
	QueueCapacity          = 100
	HeartbeatInterval      = 3 * time.Second
	CommitInterval         = 0
	PartitionWatchInterval = 5 * time.Second
	MaxAttempts            = 3
	DialTimeout            = 3 * time.Minute
	MaxWait                = 1 * time.Second
	WriterReadTimeout      = 10 * time.Second
	WriterWriteTimeout     = 10 * time.Second
	WriterRequiredAcks     = -1
	WriterMaxAttempts      = 3
)
