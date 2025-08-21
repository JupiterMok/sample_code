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
    const boolean = await userModel.insertAsync(connect, data);

    await UserModel.closeConnectionAsync(connect);

    let message = { message: 'insert is succeed' };
    if (boolean === false) {
      message = { message: 'insert is fail' };
    }

    res.json(message);
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
  })
  .post('/login', async (req, res) => {
    const userModel = new UserModel();
    const connect = await UserModel.openConnectionAsync();

    const { login_id } = req.body;

    const userData = await userModel.findOneByFilterAsync(connect, { login_id });

    await UserModel.closeConnectionAsync(connect);

    let message;

    if (req.body.login_id === undefined || req.body.password === undefined) {
      message = { message: '아이디 또는 비밀번호가 입력되지 않았습니다' };
    } else if (userData === false) {
      message = { message: '아이디를 찾을 수 없습니다. 없는 계정입니다' };
    } else if (userData.password !== req.body.password) {
      message = { message: '비밀번호가 일치하지 않습니다.' };
    } else {
      message = userData;
    }

    res.json(message);
  });
export default router;
