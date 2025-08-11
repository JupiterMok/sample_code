#!/usr/bin/env bash

curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"email":"anyone", "login_id":"host", "name":"jonh", "password":"password", "phone":2222}' \
    http://localhost:3000/server/user/insert


curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"name":"anygoods", "price":10000, "description":"anything", "category":"something"}' \
    http://localhost:3000/server/goods/insert

curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"user_id":1, "goods_id":1, "quantity":100, "order_date":20250101}' \
    http://localhost:3000/server/order/insert

curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"phone":1111}' \
    http://localhost:3000/server/user/delete
