const { mysql } = require('../mysql');
const tables = require('../tables');

const products = require('./products');
const orders = require('./orders');
const fakeData = require('./fakeData');

async function initialSetup({ recreate = false, fakeData = true }) {
  const isTablesRecreated = await tables.createTables(recreate);

  if (isTablesRecreated && fakeData) {
    await addTestData({seed: 10});
  }
}

async function addTestData({ ordersCount = 20, seed = null }) {
  return fakeData.generateFakeOrders(ordersCount, seed);
}

module.exports = {
  mysql,
  initialSetup,
  ...products,
  ...orders,
};