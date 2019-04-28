const express = require('express');
const routs = express.Router();

const db = require('../lib/dbFunctions');

// Получить список заказов
routs.get('/', async function(req, res) {
  const page = req.query.page || 1;
  const orders =  await db.getOrders(page);
  res.json(orders);
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
routs.get('/:id', async function(req, res) {
  const { id } = req.params;
});

// Обновить данные заказа (статус)
routs.put('/:id', async function(req, res) {
  const { id } = req.params;
});

module.exports = routs;
