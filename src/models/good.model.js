import mysqlserver from '../core/mysql.core.js';

// 모델
class GoodModel extends mysqlserver {
  constructor() {
    super('goods_table', 'id', 'sort');
  }
}

export default GoodModel;
