import toolRoute0 from './routers/tool_table_0.js';
import toolRoute1 from './routers/tool_table_1.js';
import toolRoute2 from './routers/tool_table_2.js';

export default (app) => {
  app.use('/routers0/tool', toolRoute0);
  app.use('/routers1/tool', toolRoute1);
  app.use('/routers2/tool', toolRoute2);
};
