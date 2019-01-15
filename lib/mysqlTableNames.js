let config = require('../config');
const TABLE_PREFIX = config.TABLE_PREFIX || '';

module.exports = {
  product: `${TABLE_PREFIX}product`,
  options: `${TABLE_PREFIX}options`,
  orders: `${TABLE_PREFIX}orders`,
  order_products: `${TABLE_PREFIX}order_products`,
  users: `${TABLE_PREFIX}users`,
};
