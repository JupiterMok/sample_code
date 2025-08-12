import mysqlserver from '../core/mysql.core.js';

// 모델
class OrderModel extends mysqlserver {
  constructor() {
    super('order_table', 'id', 'sort');
  }
}

export default OrderModel;
