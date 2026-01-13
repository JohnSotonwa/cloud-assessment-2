# ============================
# Stage 1: Build the Go binary
# ============================
FROM golang:1.25-alpine AS builder

# Set working directory
WORKDIR /app

# Install required build tools
RUN apk add --no-cache git ca-certificates build-base

# Copy go mod files first (for caching)
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Build Go binary
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o muchtodo

# ============================
# Stage 2: Runtime image
# ============================
FROM alpine:3.19

# Install CA certificates
RUN apk add --no-cache ca-certificates curl

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy binary from builder
COPY --from=builder /app/muchtodo .

# Change ownership
RUN chown -R appuser:appgroup /app

# Switch to non-root
USER appuser

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

# Run the application
CMD ["./muchtodo"]
