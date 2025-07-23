import './common/dotenv.js';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import express from 'express';

import instance from './instance.js';
import MariaTestModel from './models/test.mysql.js';
import mysqlserver from './core/mysql.core.js';
import database from './models/datebase.js';
import serverDatabase from './models/serverdatadase.js';
import router from './models/router.js';

const app = express();
const port = 3000;
app.use(express.json());

app.use('/tool', router);

app.listen(port, () => {
  instance.logger.info(`Example app listening on port ${port}`);
});

// database();
