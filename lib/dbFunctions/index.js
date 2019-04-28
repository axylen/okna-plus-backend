const { mysql } = require('../mysql');
const tables = require('../tables');

const products = require('./products');
const orders = require('./orders');

async function initialSetup({ recreate = false, fakeData = true }) {
  const isTablesRecreated = await tables.createTables(recreate);

  if (isTablesRecreated && fakeData) {
    await addTestData();
  }
}

async function addTestData() {
  // Добавить тестовые данные по заказам
}

module.exports = {
  mysql,
  initialSetup,
  ...products,
  ...orders,
};
