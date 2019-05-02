const { mysql } = require('../mysql');
const tables = require('../tables');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret_key = process.env.SECRET_KEY || 'okp_secret-key';

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
    token: jwt.sign(payload, secret_key),
  };
}

module.exports = {
  loginUser,
  secret_key,
};
