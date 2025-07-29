import express, { Router } from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  const message = { message: 'This is mysql test page' };
  res.json(message);
});

export default router;
