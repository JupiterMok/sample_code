import './common/dotenv.js';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import instance from './instance.js';
import MariaTestModel from './models/test.mysql.js';
import mysqlserver from './core/mysql.core.js';

const rl = readline.createInterface({ input, output });

function processEndCheck(x) {
  if (x === '') {
    instance.logger.info('process exit.');
    rl.close;
    process.exit();
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

  const list = await mysqlTestModel.findByFilterAsync(conncet); // 전체 리스트 가져오기
  instance.logger.info(JSON.stringify(list, null, 2));
  // instance.logger.info(list.join('\n')); 요거 되게 만들어보기

  while (true) {
    const answer = await rl.question('\nplease enter IDUS, if you want exit enter blank '); // 분기 1 readline으로 문자열 받아와서 공백이면 종료하고 IDUS면 각각 맞는 명령어 실행
    processEndCheck(answer);

    switch (answer) {
      case 'insert': {
        const getCliInputValue = await rl.question('\nplease enter text ');

        const inputData = { testcol: getCliInputValue };

        const getInsertId = await mysqlTestModel.insertAsync(conncet, inputData);

        const insertDataId = { id: getInsertId };

        const insertResult = await mysqlTestModel.findByFilterAsync(conncet, insertDataId); // 이거 한 줄로 줄일 수 없는지 확인하기. 윗 줄의 함수받아와서 insert한 목록 보여줌.
        instance.logger.info(JSON.stringify(insertResult));
        break;
      }
      case 'select': {
        const selectId = await rl.question(`\nplease enter id what you want select `);
        let selectResult;

        if (selectId === '') {
          selectResult = await mysqlTestModel.allAsync(conncet);
        } else if (!Number.isInteger(Number(selectId))) {
          instance.logger.error('error: id must be Number');
        } else {
          const inputData = { id: selectId };

          selectResult = await mysqlTestModel.findByFilterAsync(conncet, inputData);

          instance.logger.info(JSON.stringify(selectResult, null, 2));
        }
        break;
      }
      case 'selectnew': {
        const selectId = await rl.question(`\nplease enter id what you want select `);
        if (!Number.isInteger(Number(selectId))) {
          instance.logger.error('error: id must be Number');
          break;
        }

        let inputData = {};
        if (selectId !== '') {
          inputData = { id: selectId };
        }

        const selectResult = await mysqlTestModel.findByFilterAsync(conncet, inputData);

        instance.logger.info(JSON.stringify(selectResult, null, 2));
        break;
      }

      case 'count': {
        const getSearchFilter = await rl.question('\nplease enter id what you want search ');

        if (!Number.isInteger(Number(getSearchFilter))) {
          instance.logger.error('error: id must be Number');
        }

        const searchIdfilter = { id: getSearchFilter };

        const filterResult = await mysqlTestModel.countByFilterAsync(conncet, searchIdfilter);

        instance.logger.info(JSON.stringify(filterResult));
        break;
      }

      case 'update': {
        const getUpdateId_Text = await rl.question('\nplease enter update filter and text ');
        // const updateText = await rl.question('\nplease enter update text ');

        const upDateData = getUpdateId_Text.split(' ');

        if (!Number.isInteger(Number(upDateData[0]))) {
          instance.logger.error('error: id must be Number');
          break;
        }

        const findDataId = { id: upDateData[0] };
        const toUpdateData = { testcol: upDateData[1] };

        const upDateBoolean = await mysqlTestModel.updateByFilterAsync(conncet, findDataId, toUpdateData);

        if (upDateBoolean === false) {
          instance.logger.error(`error: that id not exist in ${mysqlTestModel.tableName}`);
          break;
        }

        const updataResult = await mysqlTestModel.findByFilterAsync(conncet, findDataId); // 요걸 생략할 순 없을까?
        instance.logger.info(JSON.stringify(updataResult));

        break;
      }

      case 'delete': {
        const deleteId = await rl.question('\nplease enter delete id ');

        if (!Number.isInteger(Number(deleteId))) {
          instance.logger.error('error: id must be Number');
        }

        const findDeleteId = { id: deleteId };

        const deleteBoolean = await mysqlTestModel.deleteByFilterAsync(conncet, findDeleteId);

        if (deleteBoolean === false) {
          instance.logger.error(`error: that id not exist in ${mysqlTestModel.tableName}`);
          break;
        }

        const deleteResult = await mysqlTestModel.findByFilterAsync(conncet, findDeleteId);
        instance.logger.info(JSON.stringify(deleteResult));

        break;
      }

      default:
        instance.logger.error(`text error: answer is not a insert, update, select, delete, count`);
    } // swich 문 중괄호
  } // while 문 중괄호
}; // funtion 선언 중괄호

database();
