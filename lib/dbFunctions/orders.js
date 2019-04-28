const { mysql } = require('../mysql');
const tables = require('../tables');

const { arrayToObject } = require('../functions');
const {
  getProductParams,
  getPrice,
  getOpenToValues,
  formatParams,
  getArea,
} = require('./products');

// Получить count заказов начиная с page * count
async function getOrders(page, count = 10) {}

// Создать заказ
async function createOrder(order, cart) {
  const productKeys = [...new Set(cart.map(p => p.key))];
  const productsInfo = await getProductsInfo(productKeys);

  const productList = cart.map(product => {
    const productInfo = productsInfo[product.key];
    const cost = getPrice(product.params, productInfo.fields);
    const productParams = {
      name: productInfo.name,
      type: productInfo.type,
      cost,
      count: product.count,
      area: getArea(product.params),
      params: formatParams(product.params, productInfo.fields),
    };

    return productParams;
  });

  const price = productList.reduce((acc, val) => acc + val.cost * val.count, 0);
  order.price = price;
  order.client = JSON.stringify(order.client);
  const area = productList.reduce((acc, val) => acc + val.area * val.count, 0);

  // Вставить заказ
  const { insertId } = await mysql.query(`INSERT INTO ${tables.name.orders} SET ? `, order);
  productList.map(product => {
    const orderProducts = {
      ...product,
      order_id: insertId,
      params: JSON.stringify(product.params),
    };

    return mysql.query(`INSERT INTO ${tables.name.order_products} SET ? `, orderProducts);
  });

  return {
    orderId: insertId,
    price,
    area,
  };
}

// Получить информацию о заказе
async function getOrder(id) {}

// Получить информацию о заказе
async function updateOrder(id, updatedData) {}

async function getProductsInfo(keys) {
  let productsInfo = await getProductParams(...keys);
  productsInfo = productsInfo.map(product => {
    if (product.fields.window) {
      product.fields.window.values = getOpenToValues(product.fields.window.values);
    }
    return product;
  });
  return arrayToObject(productsInfo, el => el.product_key);
}

module.exports = { getOrders, createOrder, getOrder, updateOrder };
