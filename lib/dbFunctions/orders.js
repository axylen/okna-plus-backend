const { mysql } = require('../mysql');
const tables = require('../tables');

const { arrayToObject } = require('../functions');
const {
  getProductParams,
  getPrice,
  formatProductsInfo,
  formatParams,
  getArea,
} = require('./products');

async function getNumOfOrders(search) {
  const numOfOrders = await mysql.query(
    `SELECT COUNT(*) as count FROM ${tables.name.orders} ${search}`,
  );
  return numOfOrders[0].count;
}

function getSearch(num, fio, phone) {
  if (num || fio || phone) {
    const searchStrs = [];

    if (num) searchStrs.push(`id = ${num}`);
    if (fio) {
      fio = fio.replace(/(%|#)/gi, '');
      searchStrs.push(`client LIKE '%${fio.replace(' ', '%')}%'`);
    }
    if (phone) {
      phone = phone.replace(/(%|#)/gi, '');
      searchStrs.push(`client LIKE '%${phone}%'`);
    }

    return `WHERE ${searchStrs.join(' AND ')}`;
  }

  return '';
}

// Получить count заказов начиная с page * count
async function getOrders(search, count = 10) {
  const page = search.page - 1;
  const { num, fio, phone } = search;

  const searchStr = getSearch(num, fio, phone);
  const numOfOrders = await getNumOfOrders(searchStr);
  if (page < 0 || page * count > numOfOrders) throw new Error();

  const orders = (await mysql.query(`
    SELECT * FROM ${tables.name.orders}
    ${searchStr}
    ORDER BY id DESC
    LIMIT ${page * count}, ${count}`)).map(order => {
    order.client = JSON.parse(order.client);
    return order;
  });

  return {
    ordersCount: numOfOrders,
    orders,
  };
}

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

  // Вставить список товаров
  const productsArray = productList.map(product => ({
    ...product,
    order_id: insertId,
    params: JSON.stringify(product.params),
  }));
  mysql.insertArrayOfObjects(tables.name.order_products, productsArray);

  return {
    orderId: insertId,
    price,
    area,
  };
}

// Получить информацию о заказе
async function getOrder(id) {
  let [order, cart] = await Promise.all([
    mysql.query(`SELECT * FROM ${tables.name.orders} WHERE id = ${id}`),
    mysql.query(`SELECT * FROM ${tables.name.order_products} WHERE order_id = ${id}`),
  ]);

  order = order[0];
  order.client = JSON.parse(order.client);

  cart = cart.map(el => ({ ...el, params: JSON.parse(el.params) }));

  return { order, cart };
}

// Обновить информацию о заказе
async function updateOrder(id, updatedData) {}

async function getProductsInfo(keys) {
  let productsInfo = await getProductParams(...keys);
  return arrayToObject(formatProductsInfo(productsInfo), el => el.product_key);
}

module.exports = { getOrders, createOrder, getOrder, updateOrder };
