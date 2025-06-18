import './common/dotenv.js';
import instance from './instance.js';
import MariaTestModel from './models/test.mysql.js';

const app = async () => {
  const mysqlTestModel = new MariaTestModel();
  const conn = await MariaTestModel.openConnectionAsync();
  const result = await mysqlTestModel.queryAsync(conn, 'SELECT * FROM testtable');
  instance.logger.info(JSON.stringify(result));
  const cnt = await mysqlTestModel.countByFilterAsync(conn);
  instance.logger.info(cnt);
  const a = await mysqlTestModel.insertAsync(conn, { testcol: 'ccca' });
  await mysqlTestModel.updateByFilterAsync(conn, { id: a }, { testcol: 'eee' });
  await mysqlTestModel.deleteByFilterAsync(conn, { id: a });
  const result3 = await mysqlTestModel.findByFilterAsync(conn);
  instance.logger.info(JSON.stringify(result3));
};

app();
