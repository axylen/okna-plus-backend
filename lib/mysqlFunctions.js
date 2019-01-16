const connection = require('./mysqlConnection');
const query = require('./mysqlPromise')(connection);
const createTables = require('./sqlTables');

async function clearDatabase() {
  const dbName = connection.config.database;
  await query(`DROP DATABASE ${dbName};`);
  await query(`CREATE DATABASE ${dbName};`);
  await query(`USE ${dbName};`);
}

async function initialSetup({ recreate = false, fakeData = true }) {
  if (recreate) {
    await clearDatabase();
  }

  if ((await query('SHOW TABLES;')).length == 0) {
    await initTables();
    if (fakeData) await addTestData();
  }
}

async function initTables() {
  // Создать таблицы
  await Promise.all([
    query(createTables.users),
    query(createTables.product),
    query(createTables.options),
    query(createTables.orders),
    query(createTables.orderProducts),
  ]);

  // Добавить связи
  await Promise.all([
    query(createTables.foreignOrder),
    query(createTables.foreignProduct),
  ]);

  // Добавить товары с полями
}

async function addTestData() {
  // Добавить тестовые данные по заказам
}

async function setProductParams(params) {
  for (let key in params) {
    // Запрос для изменения параметра
  }
}

module.exports = {
  query,
  initialSetup,
  setProductParams,
};
