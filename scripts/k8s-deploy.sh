#!/bin/bash
set -e

NAMESPACE="muchtodo"

echo "Creating namespace..."
kubectl apply -f kubernetes/namespace.yaml

echo "Deploying MongoDB..."
kubectl apply -f kubernetes/mongodb/mongodb-secret.yaml
kubectl apply -f kubernetes/mongodb/mongodb-configmap.yaml
kubectl apply -f kubernetes/mongodb/mongodb-pvc.yaml
kubectl apply -f kubernetes/mongodb/mongodb-deployment.yaml
kubectl apply -f kubernetes/mongodb/mongodb-service.yaml

echo "Deploying backend..."
kubectl apply -f kubernetes/backend/backend-secret.yaml
kubectl apply -f kubernetes/backend/backend-configmap.yaml
kubectl apply -f kubernetes/backend/backend-deployment.yaml
kubectl apply -f kubernetes/backend/backend-service.yaml

echo "Deploying ingress..."
kubectl apply -f kubernetes/ingress.yaml

echo "Waiting for all pods to be ready..."
kubectl wait --for=condition=ready pod -n $NAMESPACE --all --timeout=180s

echo "✅ Deployment completed. All pods are running in namespace '$NAMESPACE'."
