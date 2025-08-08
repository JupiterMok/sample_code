import mysqlserver from '../core/mysql.core.js';
import instance from '../instance.js';

// 모델
class MariaTestModel extends mysqlserver {
  constructor() {
    super('user_table', 'id', 'sort');
  }
}

export default MariaTestModel;
