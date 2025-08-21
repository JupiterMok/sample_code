import express from 'express';

import OrderModel from '../models/order.model.js';
import GoodModel from '../models/good.model.js';
import UserModel from '../models/user.model.js';

const router = express.Router();

router.get('/select', async (req, res) => {
  const { id } = req.query;

  const orderModel = new OrderModel();
  const connect = await OrderModel.openConnectionAsync();

  const result = await orderModel.findByFilterAsync(connect, { id });

  await OrderModel.closeConnectionAsync(connect);

  res.json(result);
});

router
  .post('/insert', async (req, res) => {
    const orderModel = new OrderModel();
    const connect = await OrderModel.openConnectionAsync();

    const data = req.body;
    const boolean = await orderModel.insertAsync(connect, data);

    await OrderModel.closeConnectionAsync(connect);

    let message = { message: 'insert is succeed' };
    if (boolean === false) {
      message = { message: 'insert is fail' };
    }

    res.json(message);
  })
  .post('/update', async (req, res) => {
    const orderModel = new OrderModel();
    const connect = await OrderModel.openConnectionAsync();

    const { id } = req.query;
    const data = req.body;

    const result = await orderModel.updateByFilterAsync(connect, { id }, data);

    await OrderModel.closeConnectionAsync(connect);

    let message = { message: 'update is fail' };
    if (result === true) {
      message = { message: 'update is succeed' };
    }

    res.json(message);
  })
  .post('/delete', async (req, res) => {
    const orderModel = new OrderModel();
    const connect = await OrderModel.openConnectionAsync();

    const filter = req.body;

    const result = await orderModel.deleteByFilterAsync(connect, filter);

    await OrderModel.closeConnectionAsync(connect);

    let message = { message: 'delete is fail' };
    if (result === true) {
      message = { message: 'delete is succeed' };
    }
    res.json(message);
  })
  .post('/buy', async (req, res) => {
    const userModel = new UserModel();
    const connectUser = await UserModel.openConnectionAsync();

    const getGoodData = req.query; // 실제 웹 사이트에선 요 두 부분을 쿠키에서 가져오는 듯?
    const getUserData = req.body;

    const dbUserData = await userModel.findOneByFilterAsync(connectUser, getUserData);

    await UserModel.closeConnectionAsync(connectUser);

    const goodModel = new GoodModel();
    const connectGood = await GoodModel.openConnectionAsync();

    const dbGoodData = await goodModel.findOneByFilterAsync(connectGood, getGoodData);

    await GoodModel.closeConnectionAsync(connectGood);

    let message;

    if (dbUserData === false) {
      message = { message: '로그인 정보가 잘못되었습니다. 사용자 정보를 찾을 수 없습니다.' };
    } else if (dbGoodData === false) {
      message = { message: '상품 정보가 잘못되었습니다. 상품 정보를 찾을 수 없습니다.' };
    } else if (dbUserData !== false && dbUserData !== false) {
      const orderModel = new OrderModel();
      const connectOrder = await OrderModel.openConnectionAsync();

      const orderInsertBoolean = await orderModel.insertAsync(connectOrder);

      await OrderModel.closeConnectionAsync(connectOrder);

      if (orderInsertBoolean !== false) {
        message = { message: '주문이 완료되었습니다.' };
      } else {
        message = { message: '주문에 실패했습니다' };
      }
    }

    res.json(message);
  });
export default router;
