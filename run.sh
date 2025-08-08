#!/usr/bin/env bash

curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"email":"anyone", "login_id":"host", "name":"jonh", "password":"password", "phone":"1111"}' \
    http://localhost:3000/server/insert

curl http://localhost:3000/server/select