const { connection, DB_NAME } = require('./mysqlConnection');
const lib = require('./mysqlLib')(connection);

module.exports = {
  connection,
  DB_NAME,
  mysql: lib,
};
