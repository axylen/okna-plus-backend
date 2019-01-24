const connection = require('./mysqlConnection');
const lib = require('./mysqlLib')(connection);

module.exports = {
  connection,
  mysql: lib,
};
