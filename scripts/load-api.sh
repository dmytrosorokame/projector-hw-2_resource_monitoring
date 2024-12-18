#!/bin/bash

REQUESTS=10000
CONCURRENCY=10

echo "[API] Starting testing with $REQUESTS requests and $CONCURRENCY concurrency"
ab -n $REQUESTS -c $CONCURRENCY "http://localhost/api"
echo "[API] Testing is finished."