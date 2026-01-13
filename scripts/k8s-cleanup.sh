#!/bin/bash
set -e

NAMESPACE="muchtodo"

echo "Deleting namespace '$NAMESPACE' and all resources..."
kubectl delete namespace $NAMESPACE || echo "Namespace already deleted"

echo "✅ Cleanup completed."
