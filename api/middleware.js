const jwt = require('jsonwebtoken');

const { secret_key } = require('../lib/dbFunctions');

const withAuth = function(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).send('Не авторизован. Отсутствует токен');
  } else {
    jwt.verify(token, secret_key, function(err, decoded) {
      if (err) {
        res.status(401).send('Не авторизован: Не валидный токен');
      } else {
        next();
      }
    });
  }
};

module.exports = { withAuth };
