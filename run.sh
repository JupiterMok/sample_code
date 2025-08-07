#!/usr/bin/env bash

curl http://localhost:3000/table3/tool/select?id=5

curl http://localhost:3000/table3/tool/select

curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"testcol":"jjj"}' \
    http://localhost:3000/table3/tool/insert

    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"testcol":"lll"}' \
    http://localhost:3000/table3/tool/update?id=6

curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"testcol":"jjj"}' \
    http://localhost:3000/table3/tool/delete
