# MuchTodo Backend - Containerized Deployment

This repository contains the containerized backend application **MuchTodo** and deployment manifests for local Kubernetes clusters.

## Overview

- **Backend:** Golang API
- **Database:** MongoDB
- **Deployment:** Docker Compose for local dev, Kind + Kubernetes for cluster deployment
- **Health Check:** `/health` endpoint
- **Persistence:** MongoDB data persisted via PVCs
- **Configuration:** ConfigMaps and Secrets for environment-specific settings

## Local Development (Docker Compose)


# Build and run containers
docker-compose up --build -d

# Verify health
curl http://localhost:8080/health

## Kubernetes Deployment (Kind)

# Load Docker images into Kind cluster
kind load docker-image muchtodo-backend:latest --name muchtodo-cluster

# Deploy all resources
./scripts/k8s-deploy.sh

# Verify pods
kubectl get pods -n muchtodo

# Access backend
kubectl port-forward svc/backend 8080:8080 -n muchtodo
curl http://localhost:8080/health

## Cleanup
./scripts/k8s-cleanup.sh

## Notes
- **MongoDB Compatibility:** MongoDB container uses version 4.4 for broad CPU compatibility (AVX not required).
- **Security:** Backend container configured with non-root user for security.
- **Monitoring:** Liveness and readiness probes implemented on /health for production-grade monitoring.
- **Configuration Management:** ConfigMaps and Secrets separate sensitive and environment-specific configuration.
