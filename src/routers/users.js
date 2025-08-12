import express from 'express';

import UserModel from '../models/user.model.js';

const router = express.Router();

router.get('/select', async (req, res) => {
  const filter = req.query;

  const userModel = new UserModel();
  const connect = await UserModel.openConnectionAsync();

  const result = await userModel.findByFilterAsync(connect, filter);

  await UserModel.closeConnectionAsync(connect);

  res.json(result);
});

router
  .post('/insert', async (req, res) => {
    const userModel = new UserModel();
    const connect = await UserModel.openConnectionAsync();

    const data = req.body;
    const id = await userModel.insertAsync(connect, data);

    // const index = { id };

    // const result = await userModel.findByFilterAsync(connect, index);

    await UserModel.closeConnectionAsync(connect);

    // res.json(result);
  })
  .post('/update', async (req, res) => {
    const userModel = new UserModel();
    const connect = await UserModel.openConnectionAsync();

    const filter = req.query;
    const data = req.body;

    const result = await userModel.updateByFilterAsync(connect, filter, data);

    await UserModel.closeConnectionAsync(connect);

    let message = { message: 'update is fail' };
    if (result === true) {
      message = { message: 'update is succeed' };
    }

    res.json(message);
  })
  .post('/delete', async (req, res) => {
    const userModel = new UserModel();
    const connect = await UserModel.openConnectionAsync();

    const filter = req.body;

    const result = await userModel.deleteByFilterAsync(connect, filter);

    await UserModel.closeConnectionAsync(connect);

    let message = { message: 'delete is fail' };
    if (result === true) {
      message = { message: 'delete is succeed' };
    }
    res.json(message);
  });
export default router;
