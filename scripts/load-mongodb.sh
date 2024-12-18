#!/bin/bash

REQUESTS=10000
CONCURRENCY=10

echo "[Mongo] Starting testing with $REQUESTS requests and $CONCURRENCY concurrency"
ab -n $REQUESTS -c $CONCURRENCY "http://localhost/api/mongo"
echo "[Mongo] Testing is finished."