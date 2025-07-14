import './common/dotenv.js';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import express from 'express';

import instance from './instance.js';
import MariaTestModel from './models/test.mysql.js';
import mysqlserver from './core/mysql.core.js';
import database from './models/datebase.js';
import serverDatabase from './models/serverdatadase.js';

// app();

const crudTest = async () => {
  const mysqlTestModel = new MariaTestModel();
  const conncet = await MariaTestModel.openConnectionAsync();
  const result = await mysqlTestModel.allAsync(conncet);
  return JSON.stringify(result);
};

const testData = crudTest();

const app = express();
const router = express.Router();
const port = 3000;

app.use(express.json());

/** get은 눈에 보이는 주소를 처리할 때 사용
 * 주로 주소창에 입력한 주소를 받음
 */
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

router.get('/:id', (req, res) => {
  console.log(req.params.id); // 매개변수라서 .params로 접근을 한다.
  res.send(req.params.id);
});

app.get('/select', (req, res) => {
  // res.send(serverDatabase('select'));
  res.send(testData);
  console.log(testData);
});

app.get('/posts', (req, res) => {
  res.status(201).send('GET: /posts');
});

/**
 * post는 버튼이나 클릭 등으로 보이지 않는 주소 요청을 받았을 때 사용
 */
app.post('/posts', (req, res) => {
  res.status(201).send('POST: /posts');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// database();
