let config = require('../../config');
const TABLE_PREFIX = config.TABLE_PREFIX || '';
const tables = {
  product: `${TABLE_PREFIX}product`,
  orders: `${TABLE_PREFIX}orders`,
  order_products: `${TABLE_PREFIX}order_products`,
  users: `${TABLE_PREFIX}users`,
};

tables.allNames = Object.values(tables);

module.exports = tables;
