import express from 'express';

import GoodModel from '../models/good.model.js';

const router = express.Router();

router.get('/select', async (req, res) => {
  const { id } = req.query;

  const goodModel = new GoodModel();
  const connect = await GoodModel.openConnectionAsync();

  const result = await goodModel.findByFilterAsync(connect, { id });

  await GoodModel.closeConnectionAsync(connect);

  res.json(result);
});

router
  .post('/insert', async (req, res) => {
    const goodModel = new GoodModel();
    const connect = await GoodModel.openConnectionAsync();

    const data = req.body;
    const boolean = await goodModel.insertAsync(connect, data);

    await GoodModel.closeConnectionAsync(connect);

    let message = { message: 'insert is succeed' };
    if (boolean === false) {
      message = { message: 'insert is fail' };
    }

    res.json(message);
  })
  .post('/update', async (req, res) => {
    const goodModel = new GoodModel();
    const connect = await GoodModel.openConnectionAsync();

    const { id } = req.query;
    const data = req.body;

    const result = await goodModel.updateByFilterAsync(connect, { id }, data);

    await GoodModel.closeConnectionAsync(connect);

    let message = { message: 'update is fail' };
    if (result === true) {
      message = { message: 'update is succeed' };
    }

    res.json(message);
  })
  .post('/delete', async (req, res) => {
    const goodModel = new GoodModel();
    const connect = await GoodModel.openConnectionAsync();

    const filter = req.body;

    const result = await goodModel.deleteByFilterAsync(connect, filter);

    await GoodModel.closeConnectionAsync(connect);

    let message = { message: 'delete is fail' };
    if (result === true) {
      message = { message: 'delete is succeed' };
    }
    res.json(message);
  });
export default router;
