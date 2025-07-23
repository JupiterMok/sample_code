import express, { Router } from 'express';

import instance from '../instance.js';
import MariaTestModel0 from '../models/test.mysql_0.js';
import MariaTestModel1 from '../models/test.mysql_1.js';
import MariaTestModel2 from '../models/test.mysql_2.js';
import mysqlserver from '../core/mysql.core.js';
// import tableNumber from '../router';

const router = express.Router();
const app = express();
async function selectTable() {
  let mysqlTestModel;
  if (tableNumber === 0) {
    mysqlTestModel = new MariaTestModel0();
  } else if (tableNumber === 1) {
    mysqlTestModel = new MariaTestModel1();
  } else {
    mysqlTestModel = new MariaTestModel2();
  }
  return mysqlTestModel;
}

async function connectDb() {
  let connect;
  if (tableNumber === 0) {
    connect = await MariaTestModel0.openConnectionAsync();
  } else if (tableNumber === 1) {
    connect = await MariaTestModel1.openConnectionAsync();
  } else {
    connect = await MariaTestModel2.openConnectionAsync();
  }
  return connect;
}

let tableNumber;

app.use('/table0/tool/', (req, res, next) => {
  tableNumber = 0;
});
app.use('/table1/tool', (req, res, next) => {
  tableNumber = 1;
});
app.use('/table2/tool', (req, res, next) => {
  tableNumber = 2;
});

router
  .get('/', (req, res) => {
    const message = { message: 'This is mysql test page' };
    res.json(message);
  })
  .get('/select', async (req, res) => {
    const { id } = req.query;

    // const mysqlTestModel = selectTable();
    // const connect = connectDb();

    const connect = await MariaTestModel0.openConnectionAsync();
    const mysqlTestModel = new MariaTestModel0();

    const result = await mysqlTestModel.findByFilterAsync(connect, { id });

    // await mysqlTestModel.closeConnectionAsync(connect);

    res.json(result);
  });

router
  .post('/insert', async (req, res) => {
    const connect = await MariaTestModel0.openConnectionAsync();
    const mysqlTestModel = new MariaTestModel0();

    const testcol = { testcol: req.body.testcol };
    const index = await mysqlTestModel.insertAsync(connect, testcol);

    const resreachFilter = { id: index };
    const result = await mysqlTestModel.findByFilterAsync(connect, resreachFilter);

    // await mysqlTestModel.closeConnectionAsync(connect); 함수가 정의되지 않음

    res.json(result);
  })
  .post('/update', async (req, res) => {
    const connect = await MariaTestModel0.openConnectionAsync();
    const mysqlTestModel = new MariaTestModel0();

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
    const connect = await MariaTestModel0.openConnectionAsync();
    const mysqlTestModel = new MariaTestModel0();

    const result = await mysqlTestModel.deleteByFilterAsync(connect, req.body); // 이것도 object로 선언해주는 게 좋나?

    // await mysqlTestModel.closeConnectionAsync(connect); 함수가 정의되지 않음

    let message = { message: 'delete is fail' };
    if (result === true) {
      message = { message: 'delete is succeed' };
    }
    res.json(message);
  });
export default router;
