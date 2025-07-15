import instance from '../instance.js';
import MariaTestModel from './test.mysql.js';
import mysqlserver from '../core/mysql.core.js';

/**
 *
 * @param {*} a는 CRUD를 받는 param
 * @param {*} b는 CRUD 아래의 filter 받음
 * @param {*} c는
 */
const serverDatabase = async (a, b = '', c) => {
  const mysqlTestModel = new MariaTestModel();
  const conncet = await MariaTestModel.openConnectionAsync(); // conncet에 데이터베이스 연결을 저장

  switch (a) {
    case 'select': {
      const selectId = b;

      if (!Number.isInteger(Number(selectId))) {
        return 'error: id must be Number';
      }

      let inputData = {};
      if (selectId !== '' && Number.isInteger(Number(selectId))) {
        inputData = { id: selectId };
      } else if (selectId !== '') {
        inputData = { testcol: selectId };
      }

      const selectResult = await mysqlTestModel.findByFilterAsync(conncet, inputData);

      return selectResult;
    }
    default:
      return `error: request is not a insert, update, select, delete, count`;
  } // swich 문 중괄호
}; // funtion 선언 중괄호

export default serverDatabase;
