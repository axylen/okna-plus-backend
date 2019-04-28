const { mysql } = require('../mysql');
const tables = require('../tables');

const { calcPrice, getOpenToValues, formatParam, calcArea } = require('./productParams');

async function setProductParams(params) {
  const promises = [];

  for (let key in params) {
    if (params[key].fields) params[key].fields = JSON.stringify(params[key].fields);

    promises.push(
      mysql.upsert(tables.name.product, {
        product_key: key,
        ...params[key],
      }),
    );
  }

  await Promise.all(promises);
}

async function getProductParams(...keys) {
  let data;
  if (keys.length == 0) {
    let q = `SELECT * FROM ${tables.name.product}`;
    data = await mysql.query(q);
  } else {
    let q = `SELECT * FROM ${tables.name.product} WHERE product_key IN (?)`;
    data = await mysql.query(q, [keys]);
  }

  if (data.length == 0) throw 'Product not found';

  return data.map(el => {
    el.fields = JSON.parse(el.fields);
    return el;
  });
}

async function getProductList() {
  let q = `SELECT id, product_key, name, image, type FROM ${tables.name.product}`;
  const data = await mysql.query(q);

  return data;
}

function getPrice(params, fields) {
  return +calcPrice(fields)(params).toFixed(2);
}

function getArea(params) {
  return +calcArea(params).toFixed(2);
}

function formatParams(params, fields) {
  const newParams = {};
  for (let key in params) {
    newParams[key] = formatParam(params[key], fields[key]);
  }
  return newParams;
}

function formatProductsInfo(products) {
  return products.map(product => {
    if (product.fields.window) {
      product.fields.window.values = getOpenToValues(product.fields.window.values);
    }
    return product;
  });
}

module.exports = {
  setProductParams,
  getProductParams,
  getProductList,
  getPrice,
  calcPrice,
  getOpenToValues,
  formatParams,
  getArea,
  formatProductsInfo,
};
