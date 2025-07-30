import express, { Router } from 'express';

import instance from '../instance.js';
import mysqlserver from '../core/mysql.core.js';
import MariaTestModel3 from '../models/table_3.js';
import MariaTestModel4 from '../models/table_4.js';

const router = express.Router();

function tableCheck(tableNumber) {
  if (Number(tableNumber) === 3) {
    const mysqlTestModel = new MariaTestModel3();
    return mysqlTestModel;
  } else if (Number(tableNumber) === 4) {
    const mysqlTestModel = new MariaTestModel4();
    return mysqlTestModel;
  } else {
    instance.logger.error(`error: wonrg table number`);
  }
}

async function openConnect(tableNumber) {
  if (Number(tableNumber) === 3) {
    const connect = await MariaTestModel3.openConnectionAsync();
    return connect;
  } else if (Number(tableNumber) === 4) {
    const connect = await MariaTestModel4.openConnectionAsync();
    return connect;
  } else {
    instance.logger.error(`error: wonrg table number`);
  }
}

async function closeConnect(tableNumber, connect) {
  if (Number(tableNumber) === 3) {
    await MariaTestModel3.closeConnectionAsync(connect);
  } else if (Number(tableNumber) === 4) {
    await MariaTestModel4.closeConnectionAsync(connect);
  } else {
    instance.logger.error(`error: the Table will be disconnect was incorrectly selected`);
  }
}

router.get('/select', async (req, res) => {
  const { table, id } = req.query;

  const mysqlTestModel = await tableCheck(table);
  const connect = await openConnect(table);

  const result = await mysqlTestModel.findByFilterAsync(connect, { id });

  await closeConnect(table, connect);

  res.json(result);
});

router
  .post('/insert', async (req, res) => {
    const { table } = req.query;
    const mysqlTestModel = await tableCheck(table);

    const connect = await openConnect(table);

    const { testcol } = req.body;
    const id = await mysqlTestModel.insertAsync(connect, { testcol });

    // const resreachFilter = { id: index };
    const result = await mysqlTestModel.findByFilterAsync(connect, { id });

    await closeConnect(table, connect);

    res.json(result);
  })
  .post('/update', async (req, res) => {
    const { table, id } = req.query;

    const mysqlTestModel = await tableCheck(table);

    const connect = await openConnect(table);

    const { testcol } = req.body;

    const result = await mysqlTestModel.updateByFilterAsync(connect, { id }, { testcol });

    await closeConnect(table, connect);

    let message = { message: 'update is fail' };
    if (result === true) {
      message = { message: 'update is succeed' };
    }

    res.json(message);
  })
  .post('/delete', async (req, res) => {
    const { table } = req.query;

    const mysqlTestModel = await tableCheck(table);

    const connect = await openConnect(table);

    const filter = req.body;

    const result = await mysqlTestModel.deleteByFilterAsync(connect, filter);

    await closeConnect(table, connect);

    let message = { message: 'delete is fail' };
    if (result === true) {
      message = { message: 'delete is succeed' };
    }
    res.json(message);
  });
export default router;
