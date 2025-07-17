import './common/dotenv.js';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import express from 'express';

import instance from './instance.js';
import MariaTestModel from './models/test.mysql.js';
import mysqlserver from './core/mysql.core.js';
import database from './models/datebase.js';
import serverDatabase from './models/serverdatadase.js';

const mysqlTestModel = new MariaTestModel();
const conncet = await MariaTestModel.openConnectionAsync();

const app = express();
// const router = express.Router();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('This is mysql test pge');
});

app.use((req, res, next) => {
  instance.logger.info('Time:', Date.now());
  next();
});

app.get('/tunction/:id/:filter', (req, res) => {
  serverDatabase(req.params.id, req.params.filter).then((result) => {
    res.json(result);
    instance.logger.info(result);
  });
});

// 아래로는 serverDatabase에서 기능을 밖으로 빼낸 버전
app.get('/tool/select', (req, res) => {
  mysqlTestModel.allAsync(conncet).then((result) => {
    res.json(result);
  });
});

app.get('/tool/select/:id', (req, res) => {
  mysqlTestModel.findByFilterAsync(conncet, { id: req.params.id }).then((result) => {
    res.json(result);
  });
});

app.get('/tool/insert/:text', (req, res) => {
  req.body = { testcol: req.params.text };
  mysqlTestModel.insertAsync(conncet, req.body).then((result) => {
    res.json(`insert in ${result} line`);
  });
});

// insert post 버전 예제, 그런데 get 요청과 받는 법이 다른 듯?
// app.post('/tool/insert/:text', (req, res) => {
//   mysqlTestModel.insertAsync(conncet, req.body).then((result) => {
//     res.json(`insert in ${result} line`);
//   });
// });

// await axios.post('localhost:3000/tool/insert/7', {
// testcol: 'nomad', // post 로 보낼 데이터
// });

app.get('/tool/update/:id/:text', (req, res) => {
  mysqlTestModel.updateByFilterAsync(conncet, { id: req.params.id }, { testcol: req.params.text }).then((result) => {
    res.json(`update is ${result}`);
  });
});

// app.put('/tool/update/:id/:text', (req, res) => {
//   mysqlTestModel.updateByFilterAsync(conncet, { id: req.params.id }, { testcol: req.params.text }).then((result) => {
//     res.json(`update is ${result}`);
//   });
// });

app.get('/tool/delete/:id', (req, res) => {
  if (Number.isInteger(Number(req.params.id))) {
    req.body = { id: req.params.id };
  } else {
    req.body = { testcol: req.params.id };
  }

  mysqlTestModel.deleteByFilterAsync(conncet, req.body).then((result) => {
    console.log(result);
    res.json(`delete is ${result}`);
  });
});

// app.delete('/tool/delete/:id', (req, res) => {
//   if (Number.isInteger(req.params.id)) {
//     req.body = { id: req.params.id };
//   } else {
//     req.body = { testcol: req.params.id };
//   }

//   mysqlTestModel.deleteByFilterAsync(conncet, req.body).then((result) => {
//     res.json(`delete is ${result === 'true' ? 'success' : 'fail'}`);
//   });
// });

app.listen(port, () => {
  instance.logger.info(`Example app listening on port ${port}`);
});

// database();
