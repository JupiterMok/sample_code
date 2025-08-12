import mysqlserver from '../core/mysql.core.js';

// 모델
class UserModel extends mysqlserver {
  constructor() {
    super('user_table', 'id', 'sort');
  }
}

export default UserModel;
