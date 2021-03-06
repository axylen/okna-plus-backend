const express = require('express');
const routs = express.Router();

const db = require('../lib/dbFunctions');
const { withAuth } = require('./middleware');

// Получить список заказов
routs.get('/', withAuth, async function(req, res) {
  const page = req.query.page || 1;
  const { num, fio, phone } = req.query;

  try {
    res.json(await db.getOrders({ page, num, fio, phone }));
  } catch (error) {
    res.status(404).send('Не удалось получить список заказов');
  }
});

// Добавить заказ
routs.post('/', async function(req, res) {
  const { client, products } = req.body;
  const orderData = {
    date: new Date(),
    client,
    status: 'new',
  };

  try {
    const createdOrder = await db.createOrder(orderData, products);
    res.json(createdOrder);
  } catch (error) {
    res.status(500).send('Не удалось создать заказ');
  }
});

// Получить данные по заказу
routs.get('/:id', withAuth, async function(req, res) {
  const { id } = req.params;

  try {
    res.json(await db.getOrder(id));
  } catch (error) {
    res.status(404).send('Заказ с данным id не найден');
  }
});

// Обновить данные заказа (статус)
routs.put('/:id', withAuth, async function(req, res) {
  const { id } = req.params;
});

module.exports = routs;
