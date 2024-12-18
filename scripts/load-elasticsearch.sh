#!/bin/bash

REQUESTS=10000
CONCURRENCY=10

echo "[Elastic] Starting testing with $REQUESTS requests and $CONCURRENCY concurrency"
ab -n $REQUESTS -c $CONCURRENCY "http://localhost/api/elasticsearch"
echo "[Elastic] Testing is finished."