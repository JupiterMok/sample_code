import './common/dotenv.js';

import express from 'express';

import instance from './instance.js';
import setupRoutes from './router.js';

const app = express();
const port = 3000;
app.use(express.json());

setupRoutes(app);

app.listen(port, () => {
  instance.logger.info(`Example app listening on port ${port}`);
});
