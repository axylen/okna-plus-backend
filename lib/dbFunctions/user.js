const { mysql } = require('../mysql');
const tables = require('../tables');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SECRET_KEY: secret_key } = require('../../config');

async function loginUser({ login = 'admin', password }) {
  const user = (await mysql.query(`SELECT * FROM ${tables.name.users} WHERE ?`, { login }))[0]
    .password;
  const isCorrect = await bcrypt.compare(password, user);

  if (!isCorrect) {
    return {
      err: 'Wrong password',
    };
  }

  const payload = {
    login,
  };

  return {
    token: jwt.sign(payload, secret_key, { expiresIn: '12h' }),
  };
}

module.exports = {
  loginUser,
  secret_key,
};
