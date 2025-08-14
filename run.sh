#!/usr/bin/env bash

curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"login_id":"one", "password":"1234"}' \
    http://localhost:3000/server/users/login

curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"login_id":"on", "password":"1234"}' \
    http://localhost:3000/server/users/login

curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"login_id":"one", "password":"123"}' \
    http://localhost:3000/server/users/login

curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"login_id":"one"}' \
    http://localhost:3000/server/users/login

curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"password":"1234"}' \
    http://localhost:3000/server/users/login

