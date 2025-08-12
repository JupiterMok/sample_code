import express from 'express';

import OrderModel from '../models/order.model.js';

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
    const id = await orderModel.insertAsync(connect, data);

    const index = { id };

    const result = await orderModel.findByFilterAsync(connect, index);

    await OrderModel.closeConnectionAsync(connect);

    res.json(result);
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
  });
export default router;
