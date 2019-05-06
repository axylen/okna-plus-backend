const express = require('express');
const routs = express.Router();

const db = require('../lib/dbFunctions');
const { withAuth } = require('./middleware');

// Получить статистику
routs.get('/', withAuth, async function(req, res) {
  try {
    res.json(await db.getStats());
  } catch (error) {
    console.log(error);
    res.status(404).send('Не удалось получить статистику');
  }
});

module.exports = routs;
