import toolRoute0 from './routers/tool_table_0.js';
import toolRoute1 from './routers/tool_table_1.js';
import toolRoute2 from './routers/tool_table_2.js';

let routerLine;
export default (app) => {
  app.use('/table0/tool', toolRoute0, () => {
    routerLine = 0;
  });
  app.use('/table1/tool', toolRoute1, () => {
    routerLine = 1;
  });
  app.use('/table2/tool', toolRoute2, () => {
    routerLine = 2;
  });
};

export const tableNumber = routerLine;
