import express, { Router } from 'express';

import instance from '../instance.js';
import MariaTestModel from '../models/test.mysql.js';
import mysqlserver from '../core/mysql.core.js';

const router = express.Router();

router
  .get('/', (req, res) => {
    const message = { message: 'This is mysql test page' };
    res.json(message);
  })
  .get('/select/:id', async (req, res) => {
    const connect = await MariaTestModel.openConnectionAsync();
    const mysqlTestModel = new MariaTestModel();
    const result = await mysqlTestModel.findByFilterAsync(connect, req.id);

    // await mysqlTestModel.closeConnectionAsync(connect); 함수가 정의되지 않음

    res.json(result);
  })
  .get('/insert/:text', async (req, res) => {
    const connect = await MariaTestModel.openConnectionAsync();
    const mysqlTestModel = new MariaTestModel();

    const insertdata = { testcol: req.text };
    const index = await mysqlTestModel.insertAsync(connect, insertdata);

    const resreachFilter = { id: index };
    const result = await mysqlTestModel.findByFilterAsync(connect, resreachFilter);

    // await mysqlTestModel.closeConnectionAsync(connect); 함수가 정의되지 않음

    res.json(result);
  });

router
  .post('/update', async (req, res) => {
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
  })
  .post('/delete', async (req, res) => {
    const connect = await MariaTestModel.openConnectionAsync();
    const mysqlTestModel = new MariaTestModel();

    const result = await mysqlTestModel.deleteByFilterAsync(connect, req.body); // 이것도 object로 선언해주는 게 좋나?

    // await mysqlTestModel.closeConnectionAsync(connect); 함수가 정의되지 않음

    let message = { message: 'delete is fail' };
    if (result === true) {
      message = { message: 'delete is succeed' };
    }
    res.json(message);
  });
export default router;
