FROM golang:1.19-buster as builder

# Create and change to the app directory.
WORKDIR /app

# Retrieve application dependencies.
# This allows the container build to reuse cached dependencies.
# Expecting to copy go.mod and if present go.sum.
COPY go.* ./
RUN go mod download

# Copy local code to the container image.
COPY . ./

# Build the binary.
RUN go build -v -o backend

# Use the official Debian slim image for a lean production container.
# https://hub.docker.com/_/debian
# https://docs.docker.com/develop/develop-images/multistage-build/#use-multi-stage-builds
FROM debian:buster-slim
RUN set -x && apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    ca-certificates && \
    echo "deb http://security.debian.org/debian-security buster/updates main" >> /etc/apt/sources.list && \
    apt-get update && \
    apt-get install -y netcat && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the binary to the production image from the builder stage.
COPY --from=builder /app/backend .

COPY start.sh .
COPY wait-for.sh .
COPY /db/migrations ./db/migrations

RUN chmod +x /app/wait-for.sh
RUN chmod +x /app/start.sh
ENTRYPOINT [ "/app/start.sh" ]