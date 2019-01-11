const connection = require('./mysqlConnection');
const query = require('./mysqlPromise')(connection);

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
    if (fakeData) await addFakeData();
  }
}

async function initTables() {
  // Создать таблицы в бд
  await query(`CREATE TABLE user (id INT PRIMARY KEY);`);
}

async function addFakeData() {
  // Добавить тестовые данные по заказам
}

module.exports = {
  query,
  initialSetup,
};
