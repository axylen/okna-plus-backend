let query = require('./mysqlPromise');

function upsert(table, values) {
  return query(`INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`, [
    values,
    values,
  ]);
}

function useConnection(connection) {
  query = query(connection);

  return {
    query,
    upsert,
  };
}

module.exports = useConnection;
