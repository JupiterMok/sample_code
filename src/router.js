import toolRoute0 from './routers/tool_table_0.js';
import toolRoute1 from './routers/tool_table_1.js';
import toolRoute2 from './routers/tool_table_2.js';
import table0And1 from './routers/table0And1.js';

export default (app) => {
  app.use('/tool', table0And1);
  app.use('/table0/tool', toolRoute0);
  app.use('/table1/tool', toolRoute1);
  app.use('/table2/tool', toolRoute2);
};
