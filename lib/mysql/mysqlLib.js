let query = require('./mysqlPromise');

function objToArr(obj, cb = val => val) {
  const arr = [];
  for (const key in obj) {
    arr.push(cb(obj[key], key));
  }
  return arr;
}

function insertArrayOfObjects(table, arr) {
  const keys = Object.keys(arr[0]).join(', ');
  const vals = arr.map(el => objToArr(el));

  return query(`INSERT INTO ${table} (${keys}) VALUES ?`, [vals]);
}

function upsert(table, values) {
  return query(`INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`, [values, values]);
}

function useConnection(connection) {
  query = query(connection);

  return {
    query,
    upsert,
    insertArrayOfObjects,
  };
}

module.exports = useConnection;
