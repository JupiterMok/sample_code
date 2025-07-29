import express, { Router } from 'express';

import instance from '../instance.js';
import mysqlserver from '../core/mysql.core.js';
import MariaTestModel3 from '../models/table_3.js';
import MariaTestModel4 from '../models/table_4.js';

const router = express.Router();

let connect;

async function tableCheck(tableNumber) {
  if (Number(tableNumber) === 3) {
    connect = await MariaTestModel3.openConnectionAsync();
    const mysqlTestModel = new MariaTestModel3();
    return mysqlTestModel;
  } else if (Number(tableNumber) === 4) {
    connect = await MariaTestModel4.openConnectionAsync();
    const mysqlTestModel = new MariaTestModel4();
    return mysqlTestModel;
  } else {
    instance.logger.error(`error: wonrg table number`);
  }
}

router
  .get('/', (req, res) => {
    const message = { message: 'This is mysql test page' };
    res.json(message);
  })
  .get('/select', async (req, res) => {
    const id = { id: req.query.id };

    const mysqlTestModel = await tableCheck(req.query.table);

    const result = await mysqlTestModel.findByFilterAsync(connect, { id });

    // await mysqlTestModel.closeConnectionAsync(connect);

    res.json(result);
  });

router
  .post('/insert', async (req, res) => {
    const mysqlTestModel = await tableCheck(req.query.table);

    const testcol = { testcol: req.body.testcol };
    const index = await mysqlTestModel.insertAsync(connect, testcol);

    const resreachFilter = { id: index };
    const result = await mysqlTestModel.findByFilterAsync(connect, resreachFilter);

    // await mysqlTestModel.closeConnectionAsync(connect); 함수가 정의되지 않음

    res.json(result);
  })
  .post('/update', async (req, res) => {
    const mysqlTestModel = await tableCheck(req.query.table);

    const filter = { id: req.body.id };
    const updateData = { testcol: req.body.testcol };

    const result = await mysqlTestModel.updateByFilterAsync(connect, filter, updateData);

    // await mysqlTestModel.closeConnectionAsync(connect); 함수가 정의되지 않음

    let message = { message: 'update is fail' };
    if (result === true) {
      message = { message: 'update is succeed' };
    }

    res.json(message);
  })
  .post('/delete', async (req, res) => {
    const mysqlTestModel = await tableCheck(req.query.table);

    const result = await mysqlTestModel.deleteByFilterAsync(connect, req.body); // 이것도 object로 선언해주는 게 좋나?

    // await mysqlTestModel.closeConnectionAsync(connect); 함수가 정의되지 않음

    let message = { message: 'delete is fail' };
    if (result === true) {
      message = { message: 'delete is succeed' };
    }
    res.json(message);
  });
export default router;
