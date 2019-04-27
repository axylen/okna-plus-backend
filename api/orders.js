const express = require('express');
const routs = express.Router();

const db = require('../lib/dbFunctions');

// Получить список заказов
routs.get('/', async function(req, res) {
  // Список заказов по 10 штук
});

// Добавить заказ
routs.post('/', async function(req, res) {
  const { customer, products } = req.body;

  res.json({ message: 'Ну тут всё' });
});

// Получить данные по заказу
routs.get('/:id', async function(req, res) {
  const { id } = req.params;
});

// Обновить данные заказа
routs.put('/:id', async function(req, res) {
  const { id } = req.params;
});

module.exports = routs;
