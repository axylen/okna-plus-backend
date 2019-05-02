const express = require('express');
const routs = express.Router();

const db = require('../lib/dbFunctions');
const { withAuth } = require('./middleware');

routs.post('/', async function(req, res) {
  const { password } = req.body;

  try {
    const loginRes = await db.loginUser({ password });

    if (loginRes.err) {
      return res.status(401).send('Неверный пароль');
    }

    res.json(loginRes);
  } catch (error) {
    res.status(400).send('Произошла ошибка');
  }
});

routs.get('/', withAuth, function(req, res) {
  res.send('Авторизован');
});

module.exports = routs;
