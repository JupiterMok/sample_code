import express, { Router } from 'express';

import instance from '../instance.js';
import MariaTestModel from '../models/test.mysql.js';
import mysqlserver from '../core/mysql.core.js';

// 이걸 함수로 내보내야 하나?
const app = express();
// const router = express.Router();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  // res.send('This is mysql test pge');
  const message = { message: 'This is mysql test page' };
  res.json(message);
});

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
  const index = await mysqlTestModel.insertAsync(connect, req.body);
  const resreachFilter = { id: index };
  const result = await mysqlTestModel.findByFilterAsync(connect, resreachFilter);
  // await mysqlTestModel.closeConnectionAsync(connect); 함수가 정의되지 않음
  res.json(result);
});

// const result = await axios.post('localhost:3000/tool/insert/7', {
// result.id, result.name[3]
// testcol: 'nomad', // post 로 보낼 데이터
// });

app.post('/tool/update', async (req, res) => {
  const connect = await MariaTestModel.openConnectionAsync();
  const mysqlTestModel = new MariaTestModel();
  const filter = { id: req.body.id };
  const updateData = { testcol: req.body.testcol };
  const result = await mysqlTestModel.updateByFilterAsync(connect, filter, updateData);
  // await mysqlTestModel.closeConnectionAsync(connect); 함수가 정의되지 않음
  let message = { message: 'update is fail' };
  if (result === true) {
    message = { message: 'update is succeed' };
  }
  res.json(message);
});

app.post('/tool/delete', async (req, res) => {
  const connect = await MariaTestModel.openConnectionAsync();
  const mysqlTestModel = new MariaTestModel();
  const result = await mysqlTestModel.deleteByFilterAsync(connect, req.body);
  // await mysqlTestModel.closeConnectionAsync(connect); 함수가 정의되지 않음
  let message = { message: 'delete is fail' };
  if (result === true) {
    message = { message: 'delete is succeed' };
  }
  res.json(message);
});

app.listen(port, () => {
  instance.logger.info(`Example app listening on port ${port}`);
});
export default Router;
