#!/usr/bin/env bash

curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"id":18}' \
    http://localhost:3000/tool/delete
curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"id":18}' \
    http://localhost:3000/tool/delete
