import crypto from 'crypto';

import express from 'express';

import instance from '../instance.js';
import UserModel from '../models/user.model.js';

const router = express.Router();

router.get('/select', async (req, res) => {
  const filter = req.query;

  const userModel = new UserModel();

  let connect;
  let result;
  try {
    connect = await UserModel.openConnectionAsync();
    result = await userModel.findByFilterAsync(connect, filter);
  } catch (error) {
    instance.logger.error('Error: selecting user\n', error);
  } finally {
    await UserModel.closeConnectionAsync(connect);
  }

  res.json(result);
});

router
  .post('/insert', async (req, res) => {
    const { password } = req.body;
    const hash = crypto.createHash('sha256').update(password).digest('base64');
    const data = { ...req.body, password: hash };

    const userModel = new UserModel();

    let connect;
    let insertedId;
    let userData;
    try {
      connect = await UserModel.openConnectionAsync();
      insertedId = await userModel.insertAsync(connect, data);
      userData = await userModel.findOneByFilterAsync(connect, { id: insertedId });
    } catch (error) {
      instance.logger.error('Error: inserting user\n', error);
    } finally {
      await UserModel.closeConnectionAsync(connect);
    }

    res.json(userData);
  })
  .post('/update', async (req, res) => {
    const filter = req.query;
    const data = req.body;

    const { password } = req.body;

    let hashedData;
    if (password) {
      const hashedPassword = crypto.createHash('sha256').update(password).digest('base64');
      hashedData = { ...req.body, password: hashedPassword };
    } else {
      hashedData = data;
    }

    const userModel = new UserModel();

    let connect;
    let result;
    try {
      connect = await UserModel.openConnectionAsync();
      // 업데이트 할 때 password가 들어오면 hashing 해줘야 함.
      result = await userModel.updateByFilterAsync(connect, filter, hashedData);
    } catch (error) {
      instance.logger.error('Error: updating user\n', error);
    } finally {
      await UserModel.closeConnectionAsync(connect);
    }

    let message = { message: 'update is fail' };
    if (result === true) {
      message = { message: 'update is succeed' };
    }

    res.json(message);
  })
  .post('/delete', async (req, res) => {
    const filter = req.body;

    const userModel = new UserModel();

    let connect;
    let result;
    try {
      connect = await UserModel.openConnectionAsync();
      result = await userModel.deleteByFilterAsync(connect, filter);
    } catch (error) {
      instance.logger.error('Error: deleting user\n', error);
    } finally {
      await UserModel.closeConnectionAsync(connect);
    }

    let message = { message: 'delete is fail' };
    if (result === true) {
      message = { message: 'delete is succeed' };
    }
    res.json(message);
  })
  .post('/login', async (req, res) => {
    // 1. 선언
    const { login_id, password } = req.body;

    // 2. 유효성 검사
    let message;
    if (!login_id || !password) {
      message = { message: '아이디 또는 비밀번호가 입력되지 않았습니다' };
      return res.json(message);
    }

    // 3. 데이터베이스 처리
    const userModel = new UserModel();
    let connect;
    let userData;
    try {
      connect = await UserModel.openConnectionAsync();
      userData = await userModel.findOneByFilterAsync(connect, { login_id });
    } finally {
      await UserModel.closeConnectionAsync(connect);
    }

    // 4. 응답처리
    if (!userData) {
      message = { message: '아이디를 찾을 수 없습니다. 없는 계정입니다' };
      return res.json(message);
    }

    const hashingPassword = crypto.createHash('sha256').update(password).digest('base64');
    if (hashingPassword !== userData.password) {
      message = { message: '비밀번호가 일치하지 않습니다.' };
      return res.json(message);
    }

    res.json({ data: userData, message: 'ok' });
  });
export default router;
