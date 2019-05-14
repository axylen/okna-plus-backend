const { mysql } = require('../mysql');
const tables = require('../tables');
const { FAKE_ORDERS_NUM, FAKE_ORDERS_SEED } = require('../../config');

const products = require('./products');
const orders = require('./orders');
const fakeData = require('./fakeData');
const user = require('./user');
const stats = require('./stats');

async function initialSetup({ recreate = false }) {
  const isTablesRecreated = await tables.createTables(recreate);

  if (isTablesRecreated && FAKE_ORDERS_NUM > 0) {
    await addTestData({ ordersCount: FAKE_ORDERS_NUM, seed: FAKE_ORDERS_SEED });
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
  ...user,
  ...stats,
};
