import express, { Router } from 'express';

import instance from '../instance.js';
import mysqlserver from '../core/mysql.core.js';
import MariaTestModel4 from '../models/table_4.js';

const router = express.Router();

router.get('/select', async (req, res) => {
  const { id } = req.query;

  const mysqlTestModel = new MariaTestModel4();
  const connect = await MariaTestModel4.openConnectionAsync();

  const result = await mysqlTestModel.findByFilterAsync(connect, { id });

  await MariaTestModel4.closeConnectionAsync(connect);

  res.json(result);
});

router
  .post('/insert', async (req, res) => {
    const mysqlTestModel = new MariaTestModel4();
    const connect = await MariaTestModel4.openConnectionAsync();

    const { testcol } = req.body;
    const id = await mysqlTestModel.insertAsync(connect, { testcol });

    const index = { id };

    const result = await mysqlTestModel.findByFilterAsync(connect, index);

    await MariaTestModel4.closeConnectionAsync(connect);

    res.json(result);
  })
  .post('/update', async (req, res) => {
    const mysqlTestModel = new MariaTestModel4();
    const connect = await MariaTestModel4.openConnectionAsync();

    const { id } = req.query;
    const { testcol } = req.body;

    const result = await mysqlTestModel.updateByFilterAsync(connect, { id }, { testcol });

    await MariaTestModel4.closeConnectionAsync(connect);

    let message = { message: 'update is fail' };
    if (result === true) {
      message = { message: 'update is succeed' };
    }

    res.json(message);
  })
  .post('/delete', async (req, res) => {
    const mysqlTestModel = new MariaTestModel4();
    const connect = await MariaTestModel4.openConnectionAsync();

    const { filter } = req.body;

    const result = await mysqlTestModel.deleteByFilterAsync(connect, filter);

    await MariaTestModel4.closeConnectionAsync(connect);

    let message = { message: 'delete is fail' };
    if (result === true) {
      message = { message: 'delete is succeed' };
    }
    res.json(message);
  });
export default router;
