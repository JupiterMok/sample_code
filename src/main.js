import './common/dotenv.js';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import instance from './instance.js';
import MariaTestModel from './models/test.mysql.js';

const rl = readline.createInterface({ input, output });

// const app = async () => {
//   const mysqlTestModel = new MariaTestModel();
//   const conn = await MariaTestModel.openConnectionAsync();
//   const result = await mysqlTestModel.queryAsync(conn, 'SELECT * FROM testtable');
//   instance.logger.info(JSON.stringify(result));

//   const cnt = await mysqlTestModel.countByFilterAsync(conn);
//   instance.logger.info(cnt);

//   const a = await mysqlTestModel.insertAsync(conn, { testcol: 'ccca' });
//   await mysqlTestModel.updateByFilterAsync(conn, { id: a }, { testcol: 'eee' });
//   await mysqlTestModel.deleteByFilterAsync(conn, { id: a });
//   const result3 = await mysqlTestModel.findByFilterAsync(conn);
//   instance.logger.info(JSON.stringify(result3));
// };

// app();

const database = async () => {
  const mysqlTestModel = new MariaTestModel();
  const conncet = await MariaTestModel.openConnectionAsync(); // conncet에 데이터베이스 연결을 저장

  const list = await mysqlTestModel.queryAsync(conncet, 'SELECT * FROM testtable'); // 전체 리스트 가져오기
  instance.logger.info(JSON.stringify(list));

  const fliter = { id: 5 }; // fs 모듈로 숫자 받아와서 id 검색
  const fliterResult = await mysqlTestModel.countByFilterAsync(conncet, fliter);
  instance.logger.info(JSON.stringify(fliterResult));

  const answer = await rl.question('please enter IDUS, if you want exit enter blank\n');
  if (answer === '') {
    rl.close;
  } else if (answer === 'insert') {
    const insertValue = await rl.question('please enter text\n');
    const insertId = { id: await mysqlTestModel.insertAsync(conncet, { testcol: insertValue }) };
    const insertResult = await mysqlTestModel.findByFilterAsync(conncet, insertId);
    instance.logger.info(JSON.stringify(insertResult));
  }

  process.exit();
};

database();
