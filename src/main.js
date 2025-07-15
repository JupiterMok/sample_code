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

app.get('/:id/:filter', (req, res) => {
  // /:id/:id 이렇게 못하나?
  serverDatabase(req.params.id, req.params.filter).then((result) => {
    res.json(result);
    instance.logger.info(result);
  });
});

app.get('/tool/select/:id', (req, res) => {
  // serverDatabase에서 기능을 밖으로 빼낸 버전
  mysqlTestModel.findByFilterAsync(conncet, { id: req.params.id }).then((result) => {
    res.json(result);
  });
});

app.get('/tool/update/:id/:text', (req, res) => {
  // serverDatabase에서 기능을 밖으로 빼낸 버전
  mysqlTestModel.updateByFilterAsync(conncet, { id: req.params.id }, { testcol: req.params.text }).then((result) => {
    res.json(`update is ${result}`);
  });
});

app.listen(port, () => {
  instance.logger.info(`Example app listening on port ${port}`);
});

// database();
