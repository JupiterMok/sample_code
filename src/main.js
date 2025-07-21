import './common/dotenv.js';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import express from 'express';

import instance from './instance.js';
import MariaTestModel from './models/test.mysql.js';
import mysqlserver from './core/mysql.core.js';
import database from './models/datebase.js';
import serverDatabase from './models/serverdatadase.js';

const app = express();
// const router = express.Router();
const port = 3000;

app.use(express.json());

// 실험용
app.get('/query', (req, res) => {
  res.send(req.query);
});
// 실험용
app.post('/tool/post', (req, res) => {
  res.json(req.body);
});

app.get('/', (req, res) => {
  // res.send('This is mysql test pge');
  const message = { message: 'This is mysql test page' };
  res.json(message);
});

app.use((req, res, next) => {
  instance.logger.info('Time:', Date.now());
  next();
});

// 아래로는 serverDatabase에서 기능을 밖으로 빼낸 버전
app.get('/select', async (req, res) => {
  const connect = await MariaTestModel.openConnectionAsync();
  const mysqlTestModel = new MariaTestModel();
  const result = await mysqlTestModel.allAsync(connect);
  await mysqlTestModel.closeConnectionAsync(connect);
  return res.json(result);
});

// get query http://localhost:3000/tool/select?id=3
// post query X
// post body
// curl 에서 body 를 전송하는 옵션은 -d 또는 --data

app.get('/tool/select', async (req, res) => {
  const connect = await MariaTestModel.openConnectionAsync();
  const mysqlTestModel = new MariaTestModel();
  const result = await mysqlTestModel.findByFilterAsync(connect, req.query);
  // await mysqlTestModel.closeConnectionAsync(connect); 함수가 정의되지 않음
  res.json(result);
});

app.post('/tool/insert', async (req, res) => {
  const connect = await MariaTestModel.openConnectionAsync();
  const mysqlTestModel = new MariaTestModel();
  const result = await mysqlTestModel.insertAsync(connect, req.body);
  // await mysqlTestModel.closeConnectionAsync(connect); 함수가 정의되지 않음
  res.json(`insert in ${result} line`);
});

// insert post 버전 예제, 그런데 get 요청과 받는 법이 다른 듯?
// app.post('/tool/insert/:text', (req, res) => {
//   mysqlTestModel.insertAsync(conncet, req.body).then((result) => {
//     res.json(`insert in ${result} line`);
//   });
// });

// const result = await axios.post('localhost:3000/tool/insert/7', {
// result.id, result.name[3]
// testcol: 'nomad', // post 로 보낼 데이터
// });

app.post('/tool/update', async (req, res) => {
  const connect = await MariaTestModel.openConnectionAsync();
  const mysqlTestModel = new MariaTestModel();
  const result = await mysqlTestModel.updateByFilterAsync(connect, req.body.id, req.body.testcol);
  // await mysqlTestModel.closeConnectionAsync(connect); 함수가 정의되지 않음
  res.json(`update is ${result}`);
});

// app.put('/tool/update/:id/:text', (req, res) => {
//   mysqlTestModel.updateByFilterAsync(conncet, { id: req.params.id }, { testcol: req.params.text }).then((result) => {
//     res.json(`update is ${result}`);
//   });
// });

app.post('/tool/delete', async (req, res) => {
  const connect = await MariaTestModel.openConnectionAsync();
  const mysqlTestModel = new MariaTestModel();
  const result = await mysqlTestModel.deleteByFilterAsync(connect, req.body);
  // await mysqlTestModel.closeConnectionAsync(connect); 함수가 정의되지 않음
  res.json(`delete is ${result}`);
});

let data = {
  id: 1,
  name: 'John Doe',
  age: 30
};

// 이게 안 되는데 주소창으로 보낸 요청은 모두 get으로 처리되는 듯, put요청을 보내려면 따로 사이트 디자인을 해야함.
app.put('/api/data/:id', (req, res) => {
  const { id } = req.params;
  req.body = {
    // id: 2,
    name: 'Cess',
    age: 24
  };
  const updatedData = req.body;

  // 업데이트 전에 데이터 존재 유효성 검사
  if (data.id !== parseInt(id)) {
    return res.status(404).send('데이터를 찾을 수 없습니다.');
  }

  // 객체 전개 구문을 사용하여 데이터 속성 업데이트
  data = { ...data, ...updatedData };

  res.json(data);
});

app.listen(port, () => {
  instance.logger.info(`Example app listening on port ${port}`);
});

// database();
