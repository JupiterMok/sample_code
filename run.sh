#!/usr/bin/env bash

curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"login_id":"potter", "name":"mok", "password":"7777", "email":"cool", "phone":"010"}' \
    http://localhost:3000/server/users/insert