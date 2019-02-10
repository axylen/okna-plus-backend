const { mysql } = require('./mysql');
const tables = require('./tables');

async function initialSetup({ recreate = false, fakeData = true }) {
  const isTablesRecreated = await tables.createTables(recreate);

  if (isTablesRecreated && fakeData) {
    await addTestData();
  }
}

async function addTestData() {
  // Добавить тестовые данные по заказам
}

async function setProductParams(params) {
  const promises = [];

  for (let key in params) {
    if (params[key].fields)
      params[key].fields = JSON.stringify(params[key].fields);

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
  let q = `SELECT product_key, name, image FROM ${tables.name.product}`;
  const data = await mysql.query(q);

  return data;
}

module.exports = {
  mysql,
  initialSetup,
  setProductParams,
  getProductParams,
  getProductList,
};
