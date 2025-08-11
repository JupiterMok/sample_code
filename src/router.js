import table0 from './routers/table0.js';
import table1 from './routers/table1.js';
import table2 from './routers/table2.js';
import table3 from './routers/table3.js';
import table4 from './routers/table4.js';
import user from './routers/user.js';
import goods from './routers/goods.js';
import order from './routers/order.js';
import welcomePage from './routers/welcomePage.js';

export default (app) => {
  app.use('/', welcomePage);
  app.use('/table0/tool', table0);
  app.use('/table1/tool', table1);
  app.use('/table2/tool', table2);
  app.use('/table3/tool', table3);
  app.use('/table4/tool', table4);
  app.use('/server/user', user);
  app.use('/server/goods', goods);
  app.use('/server/order', order);
};
