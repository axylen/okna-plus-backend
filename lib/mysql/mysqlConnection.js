const config = require('../../config');

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASS,
  port: config.DB_PORT,
});

module.exports = { connection, DB_NAME: config.DB_NAME };
