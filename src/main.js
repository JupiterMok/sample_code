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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((req, res, next) => {
  instance.logger.info('Time:', Date.now());
  next();
});

app.get('/user/:id', (req, res) => {
  instance.logger.info(req.params.id); // 매개변수라서 .params로 접근을 한다.
  res.send(req.params.id);
});

app.get('/:id', (req, res) => {
  serverDatabase(req.params.id).then((result) => {
    res.json(result);
    instance.logger.info(result);
  });
});

app.listen(port, () => {
  instance.logger.info(`Example app listening on port ${port}`);
});

// database();
