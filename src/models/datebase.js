import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import instance from '../instance.js';
import MariaTestModel from './test.mysql.js';
import mysqlserver from '../core/mysql.core.js';

const rl = readline.createInterface({ input, output });

function _processEndCheck(x) {
  if (x === '') {
    instance.logger.info('process exit.');
    rl.close;
    process.exit();
  }
}

function _stupidFindIdValue(x) {
  const idValue = JSON.stringify(x).split(',')[0].split('');
  idValue.splice(0, 7);
  return idValue.join('');
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

const database = async () => {
  const mysqlTestModel = new MariaTestModel();
  const conncet = await MariaTestModel.openConnectionAsync(); // conncet에 데이터베이스 연결을 저장

  const list = await mysqlTestModel.findByFilterAsync(conncet); // 전체 리스트 가져오기
  instance.logger.info(JSON.stringify(list, null, 2));
  // instance.logger.info(JSON.stringify(list).toString().split(',').join('\n')); 이제 여기서 2개씩 합쳐서 보여주면 됨.

  while (true) {
    const answer = await rl.question('\nplease enter IDUS, if you want exit enter blank '); // 분기 1 readline으로 문자열 받아와서 공백이면 종료하고 IDUS면 각각 맞는 명령어 실행
    _processEndCheck(answer);

    switch (answer) {
      case 'insert': {
        const getCliInputValue = await rl.question('\nplease enter insert text ');
        const inputData = { testcol: getCliInputValue };

        const getInsertId = await mysqlTestModel.insertAsync(conncet, inputData);
        const insertDataId = { id: getInsertId };

        const insertResult = await mysqlTestModel.findByFilterAsync(conncet, insertDataId); // 이거 한 줄로 줄일 수 없는지 확인하기. 윗 줄의 함수받아와서 insert한 목록 보여줌.
        instance.logger.info(JSON.stringify(insertResult));
        break;
      }

      case 'select': {
        const getIdfilter = await rl.question(`\nplease enter id what you want select `);
        let selectResult;

        if (getIdfilter === '') {
          selectResult = await mysqlTestModel.allAsync(conncet);
        }

        if (getIdfilter !== '' && !Number.isInteger(Number(getIdfilter))) {
          instance.logger.error('error: id must be Number');
          break;
        }

        if (getIdfilter !== '' && Number.isInteger(Number(getIdfilter))) {
          const selectIdFilter = { id: getIdfilter };
          selectResult = await mysqlTestModel.findByFilterAsync(conncet, selectIdFilter);
        }

        instance.logger.info(JSON.stringify(selectResult, null, 2));
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
        // const getChooseFilter = await rl.question('\nwhich do you want filter Id or text? ');

        const getUpdateFilter = await rl.question('\nplease enter update filter ');
        const getUpdateText = await rl.question('\nplease enter update text ');

        let updateFilter;
        let findResultFilter;

        if (getUpdateFilter === 'all') {
          // 이거 필터가 없으면 전체 검색이 안 됨
          updateFilter = {};
          findResultFilter = updateFilter;
        } else if (Number.isInteger(Number(getUpdateFilter))) {
          updateFilter = { id: getUpdateFilter };
          findResultFilter = updateFilter;
        } else if (typeof getUpdateFilter === 'string') {
          // update filter를 sting으로 받았을 때, datebase에 같은 값이 여러 개이면 어떻게 되는지 확인.
          updateFilter = { testcol: getUpdateFilter };
          findResultFilter = { testcol: getUpdateText };
        } else {
          instance.logger.error('error: wrong update filter form');
          break;
        }

        const updateTextData = { testcol: getUpdateText };

        const UpdateBoolean = await mysqlTestModel.updateByFilterAsync(conncet, updateFilter, updateTextData);

        if (UpdateBoolean === true) {
          const updataResult = await mysqlTestModel.findByFilterAsync(conncet, findResultFilter); // 요걸 생략할 순 없을까?
          instance.logger.info(JSON.stringify(updataResult));
        } else {
          instance.logger.error(`error: that id or textcol not exist in ${mysqlTestModel.tableName}`);
        }

        break;
      }

      case 'delete': {
        const deleteId = await rl.question('\nplease enter delete id ');

        if (!Number.isInteger(Number(deleteId))) {
          instance.logger.error('error: id must be Number');
        }

        const findDeleteId = { id: deleteId };

        const checkdeleteId = await mysqlTestModel.countByFilterAsync(conncet, findDeleteId);

        if (checkdeleteId === 0) {
          instance.logger.error(`error: that id not exist in ${mysqlTestModel.tableName}`);
          break;
        }

        const deleteResult = await mysqlTestModel.findByFilterAsync(conncet, findDeleteId);

        await mysqlTestModel.deleteByFilterAsync(conncet, findDeleteId);

        instance.logger.info(`${deleteResult} in ${mysqlTestModel.tableName} is deleted`);

        break;
      }

      case 'deletenew': {
        const deleteId = await rl.question('\nplease enter delete id ');

        if (!Number.isInteger(Number(deleteId))) {
          instance.logger.error('error: id must be Number');
        }

        const findDeleteId = { id: deleteId };

        const deleteBoolean = await mysqlTestModel.deleteByFilterAsync(conncet, findDeleteId);

        if (deleteBoolean === 'true') {
          instance.logger.info(`${findDeleteId} in ${mysqlTestModel.tableName} is deleted`);
        } else {
          instance.logger.error(`error: that id not exist in ${mysqlTestModel.tableName}`);
        }
        break;
      }

      default:
        instance.logger.error(`text error: answer is not a insert, update, select, delete, count`);
    } // swich 문 중괄호
  } // while 문 중괄호
}; // funtion 선언 중괄호

export default database;
