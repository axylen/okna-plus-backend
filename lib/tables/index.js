const { connection, mysql } = require('../mysql');
const table = require('./mysqlTableNames');
const sqlTables = require('./sqlTables');

async function initTables(recreate = false) {
  if (recreate) {
    await clearDatabase();
  }

  if ((await mysql.query('SHOW TABLES;')).length == 0) {
    await createTables();
    await createProducts();
    return true; // Если была создана таблица - возвращается true
  }

  return false;
}

async function clearDatabase() {
  // переделать, чтобы удалялась не база, а только таблицы
  const dbName = connection.config.database;
  await mysql.query(`DROP DATABASE ${dbName};`);
  await mysql.query(`CREATE DATABASE ${dbName};`);
  await mysql.query(`USE ${dbName};`);
}

async function createTables() {
  // Создание таблиц
  await Promise.all([
    mysql.query(sqlTables.users),
    mysql.query(sqlTables.product),
    mysql.query(sqlTables.options),
    mysql.query(sqlTables.orders),
    mysql.query(sqlTables.orderProducts),
  ]);

  // Создание связей
  await Promise.all([
    mysql.query(sqlTables.foreignOrder),
    mysql.query(sqlTables.foreignProduct),
  ]);
}

async function createProducts() {
  await Promise.all([
    mysql.upsert(table.product, {
      product_key: 'w1',
      name: 'Окно',
    }),
    mysql.upsert(table.product, {
      product_key: 'w2',
      name: 'Окно двухстворчатое',
    }),
    mysql.upsert(table.product, {
      product_key: 'w3',
      name: 'Окно трёхстворчатое',
    }),
  ]);
}

module.exports = {
  name: table,
  createTables: initTables,
};
