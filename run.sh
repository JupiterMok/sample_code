#!/usr/bin/env bash

curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"email":"personOne", "login_id":"one", "name":"bob", "password":"1234", "phone":2345}' \
    http://localhost:3000/server/users/insert

    curl http://localhost:3000/server/users/select?email=personOne

curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"name":"box", "price":20000, "description":"triangle", "category":"box"}' \
    http://localhost:3000/server/goods/insert

    curl http://localhost:3000/server/goods/select?name=box

curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"user_id":6, "goods_id":8, "quantity":3, "order_date":20250812}' \
    http://localhost:3000/server/orders/insert

    curl http://localhost:3000/server/orders/select?order_date=20240812

curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"phone":2222}' \
    http://localhost:3000/server/users/delete

curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"name":"present","price":80,"description":"a little","category":"some"}' \
    http://localhost:3000/server/goods/update?id=7

    curl http://localhost:3000/server/goods/select?id=7
