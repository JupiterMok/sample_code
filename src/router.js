import user from './routers/users.js';
import goods from './routers/goods.js';
import order from './routers/orders.js';

export default (app) => {
  app.use('/server/users', user);
  app.use('/server/goods', goods);
  app.use('/server/orders', order);
};
