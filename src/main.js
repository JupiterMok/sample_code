import './common/dotenv.js';

// import Hash256 from 'bcrypto/lib/hash256.js';
// import bcrypt from 'bcrypto/lib/bcrypt.js';
// import bcrypto from 'bcrypto/lib/bcrypto.js';
// import Sha256 from 'bcrypto/lib/sha256.js';
// import pbkdf2 from 'bcrypto/lib/pbkdf2.js';
import crypto from 'crypto';

import express from 'express';

import instance from './instance.js';
import setupRoutes from './router.js';

// const app = express();
// const port = 3000;
// app.use(express.json());

// setupRoutes(app);

// app.listen(port, () => {
//   instance.logger.info(`Example app listening on port ${port}`);
// });

const password = 'aaa';
const hash = crypto.createHash('sha256').update(password).digest('base64');

console.log(hash);
// const digest = bcrypt.digest(Buffer.alloc(32, 0xaa));

// const hashing = bcrypt.pbkdf(password, entropy, 100, 32, 'sha256');
// const hashing2 = bcrypt.pbkdf2(password, entropy, 100, 32, 'sha256');
