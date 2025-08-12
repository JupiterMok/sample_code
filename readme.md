# readme.md

## todo

### 20250812

- [ ] insert에서 결과 튕겨져 나오는 부분 삭제
- [ ] users에서 login 구현하기
  - [ ] 아이디가 틀리면 해당되는 유저가 없다는 메세지
  - [ ] 아이디나 패스워드가 없으면 항목이 비었다는 메세지
  - [ ] 패스워드가 틀리면 비밀번호가 잘못되었다는 메세지
  - [ ] 아이디와 패스워드가 맞으면 사용자 정보 리턴

### 20250730

- [x] 구조 파괴문 원래대로 돌려놓기
- [x] 더미 코드 지우기, 테이블 0~2.
- [x] user table 만들기, id login_id name password email phone 포함하기.
- [x] goods table 만들기, id name price description category 포함하기.
- [x] order table 만들기, id user_id goods_id quantity order_date 포함하기.
- [x] run.sh 구성하기.

#### 20250730 질문

- db를 바꾸고 싶은데 어떻게 해야 하는가?
- object 선언을 다 구조 파괴문으로 바꿨는데 잘한 일인가?
- req.body, req.params, req.query 를 함수에 파라미터로 받으면 보안 문제가 있다고 하셨는데 중간에 가로챌 수 있는 것인가?

### 20250723

- [x] discord 방송 셋팅하기
- [x] insert post로 바꾸기
- [x] routing 해서 각기 다른 테이블로 연결해놓기

### 20250718

- [x] github 연동 다시 해놓기
- [x] 각 명령어마다 conncet 열고 닫게 바꾸기
- [x] then 사용하는 것을 async로 바꾸기
- [x] insert랑 update를 app.post를 이용하게 바꾸기 (body를 이용해서)
- [x] routing 하기, route.js로 분리하기
- [ ] Eunm으로 if 문 간단하게 바꾸기

### 20250710

- [x] update 기능에서 대상을 서치할 때, id뿐 아니라 testcol으로도 검색 가능하게 분리하기
- [x] database 함수를 main 밖으로 빼내서 main 구조를 최대한 간단하게 바꿀 것
- [ ] express, route 를 사용하는 샘플 만들기, CRUD를 사용하게 만들기, 추가로 main이 길어지면 밖으로 빼내기
- [ ] Enum으로 if문 간단하게 만들기

### 20250703

- [x] 로그 뿌릴 때 데이터베이스 값 새로로 나오게 하기
- [x] if 문 대신 switch 문으로 바꾸기

## 주의

- queryAsncy는 보안에 취약함. 쓰지 말기.
- 약자 쓰지 말기
- 이름 지을 때 앞부분 맞추기
- 항상 커밋하는 습관 들이기
- 주소창이 마치 콘솔창처럼 쓰이는 것 같은 느낌이 든다.
- express 모듈에서 get과 post를 주로 쓴다. app.post를 이용해서 update랑 insert를 처리한다. get에서는 보안상의 이유로 body를 쓰지 않고 body는 post로 처리한다.
- 함수는 일을 줄이기 위해서 사용, 일을 늘리면 안 됨

## update list

- new 버전으로 바꾸기
- 추가 수정사항 생각해오기
- 사이트에 표로 정보 뿌리게 만들기
- 터미널이 아니라 사이트에서 버튼으로 IUSD 작동하게 만들기

명령어

```shell
curl -X POST \
     -H "Content-Type: application/json" \
     http://localhost:3000/tool/select?id=18
curl -X GET \
     -H "Content-Type: application/json" \
     -d '{"id":18}' \
     http://localhost:3000/tool/delete

curl http://localhost:3000/tool/select?id=21

curl http://localhost:3000/tool
```
