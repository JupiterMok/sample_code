#!/usr/bin/env bash

curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"email":"personOne", "login_id":"one", "name":"bob", "password":"1234", "phone":2345}' \
    http://localhost:3000/server/users/insert