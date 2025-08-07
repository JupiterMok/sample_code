import express, { Router } from 'express';

import instance from '../instance.js';
import mysqlserver from '../core/mysql.core.js';
import MariaTestModel2 from '../models/table_2.js';

const router = express.Router();

router.get('/select', async (req, res) => {
  const { id } = req.query;

  const mysqlTestModel = new MariaTestModel2();
  const connect = await MariaTestModel2.openConnectionAsync();

  const result = await mysqlTestModel.findByFilterAsync(connect, { id });

  await MariaTestModel2.closeConnectionAsync(connect);

  res.json(result);
});

router
  .post('/insert', async (req, res) => {
    const mysqlTestModel = new MariaTestModel2();
    const connect = await MariaTestModel2.openConnectionAsync();

    const { testcol } = req.body;
    const id = await mysqlTestModel.insertAsync(connect, { testcol });

    const index = { id };

    const result = await mysqlTestModel.findByFilterAsync(connect, index);

    await MariaTestModel2.closeConnectionAsync(connect);

    res.json(result);
  })
  .post('/update', async (req, res) => {
    const mysqlTestModel = new MariaTestModel2();
    const connect = await MariaTestModel2.openConnectionAsync();

    const { id } = req.query;
    const { testcol } = req.body;

    const result = await mysqlTestModel.updateByFilterAsync(connect, { id }, { testcol });

    await MariaTestModel2.closeConnectionAsync(connect);

    let message = { message: 'update is fail' };
    if (result === true) {
      message = { message: 'update is succeed' };
    }

    res.json(message);
  })
  .post('/delete', async (req, res) => {
    const mysqlTestModel = new MariaTestModel2();
    const connect = await MariaTestModel2.openConnectionAsync();

    const filter = req.body;

    const result = await mysqlTestModel.deleteByFilterAsync(connect, filter);

    await MariaTestModel2.closeConnectionAsync(connect);

    let message = { message: 'delete is fail' };
    if (result === true) {
      message = { message: 'delete is succeed' };
    }
    res.json(message);
  });
export default router;
