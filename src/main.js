import './common/dotenv.js';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import instance from './instance.js';
import MariaTestModel from './models/test.mysql.js';

const rl = readline.createInterface({ input, output });

function processEndCheck(x) {
  if (x === '') {
    instance.logger.info('process exit.');
    rl.close;
  }
}

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
  // instance.logger.info(list.join('\n')); 요거 되게 만들어보기

  const answer = await rl.question('\nplease enter IDUS, if you want exit enter blank '); // 분기 1 readline으로 문자열 받아와서 공백이면 종료하고 IDUS면 각각 맞는 명령어 실행
  processEndCheck(answer);
  if (answer === 'insert') {
    // 분기-1 insert면 text를 받아서 그 값을 testcol에 넣음
    const insertValue = await rl.question('\nplease enter text ');
    processEndCheck(insertValue);
    const insertId = { id: await mysqlTestModel.insertAsync(conncet, { testcol: insertValue }) }; // insertAsync 메서드 실행시키고 { id: * } 형태에 오브젝트에 넣음.
    const insertResult = await mysqlTestModel.findByFilterAsync(conncet, insertId); // 이거 한 줄로 줄일 수 없는지 확인하기. 윗 줄의 함수받아와서 insert한 목록 보여줌.
    instance.logger.info(JSON.stringify(insertResult));
  } else if (answer === 'select') {
    // 분기-1 select면 query 문법을 받아서 SELECT 실행.
    const selectQuery = await rl.question('\nplease enter query\nSELECT * FROM testtable WHERE ');
    processEndCheck(selectQuery);
    const selectResult = await mysqlTestModel.queryAsync(conncet, `SELECT * FROM testtable WHERE ${selectQuery}`);
    // const selected = await mysqlTestModel.queryAsync(conncet, selectQuery); 이건 앞 부분 없이 query 문법 전체를 쓰는 것.
    instance.logger.info(JSON.stringify(selectResult));
  } else if (answer === 'filter') {
    // 분기-1 filter면 id 받아서 검색.
    const filteranswer = await rl.question('\nplease enter id what you want search ');
    processEndCheck(filteranswer);
    const filterResult = await mysqlTestModel.countByFilterAsync(conncet, { id: filteranswer });
    instance.logger.info(JSON.stringify(filterResult));
  } else if (answer === 'update') {
    // 분기-1 updata면 id랑 text받아서 updata하기.
    const updataId = await rl.question('\nplease enter update filter ');
    processEndCheck(updataId);
    const updataText = await rl.question('\nplease enter update text ');
    processEndCheck(updataText);
    const updataBoolean = await mysqlTestModel.updateByFilterAsync(conncet, { id: updataId }, { testcol: updataText });
    if (updataBoolean === true) {
      const updataResult = await mysqlTestModel.queryAsync(conncet, `SELECT * FROM testtable WHERE id = ${updataId}`);
      instance.logger.info(JSON.stringify(updataResult));
    } else instance.logger.error('error: id must be Number'); // 이거 오류 메세지 id가 숫자가 아님이랑 대상 id를 가진 값이 존재하지 않습니다. 둘로 나눠야 함
  } else if (answer === 'delete') {
    // 분기-1 delete
    const deleteId = await rl.question('\nplease enter delete id ');
    processEndCheck(deleteId);
    const deleteBoolean = await mysqlTestModel.deleteByFilterAsync(conncet, { id: deleteId });
    if (deleteBoolean === true) {
      const deleteResult = await mysqlTestModel.queryAsync(conncet, `SELECT * FROM testtable`);
      instance.logger.info(JSON.stringify(deleteResult));
    } else instance.logger.error('error: id must be Number'); // 이거 오류 메세지 id가 숫자가 아님이랑 대상 id를 가진 값이 존재하지 않습니다. 둘로 나눠야 함
  } else {
    // 분기-1 text가 ISUD가 아니면 오류 출력.
    instance.logger.error(`text error: answer is not a IUSD`);
  }
  // const end = await mysqlTestModel.queryAsync(conncet, 'SELECT * FROM testtable'); // 전체 리스트 가져오기
  // instance.logger.info(JSON.stringify(end));
  process.exit();
};

database();
