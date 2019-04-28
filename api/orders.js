const express = require('express');
const routs = express.Router();

const db = require('../lib/dbFunctions');

// Получить список заказов
routs.get('/', async function(req, res) {
  // Список заказов по 10 штук
});

// Добавить заказ
routs.post('/', async function(req, res) {
  const { client, products } = req.body;
  const orderData = {
    date: new Date(),
    client,
    status: 'new',
  };

  const resp = await db.createOrder(orderData, products);

  // Запросить данные по списку товаров
  // Рассчитать параметры для списка товаров
  // Рассчитать параметры для заказа
  // Добавить заказ
  // Получить id заказа
  // Добавить список товаров к заказу с полученным id

  // ДАННЫЕ О ЗАКАЗЕ
  // id
  // date
  // * client
  // status
  // price - сумма стоимостей товаров * их количество

  // ДАННЫЕ О СПИСКЕ ТОВАРОВ ЗАКАЗА
  // id
  // order_id (из данных о заказе)
  // name - берётся из базы по ключу
  // type - берётся из базы по ключу
  // cost - рассчитывается по параметрам
  // * count
  // area - рассчитывается по параметрам
  // * params

  res.json(resp);
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
