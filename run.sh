#!/usr/bin/env bash

curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"login_id":"herry"}' \
    http://localhost:3000/server/users/update?id=9