const { mysql } = require('./mysql');
const tables = require('./tables');
const defaultProduct = require('./defaultProducts');
const { arrayToObject } = require('./functions');

async function initialSetup({ recreate = false, fakeData = true }) {
  if (await tables.createTables(recreate)) {
    await setProductParams({
      w1: defaultProduct.window1,
      w2: defaultProduct.window2,
      w3: defaultProduct.window3,
    });

    if (fakeData) await addTestData();
  }
}

async function addTestData() {
  // Добавить тестовые данные по заказам
}

async function setProductParams(params) {
  const promises = [];

  for (let key in params) {
    promises.push(
      mysql.upsert(tables.name.options, {
        product_key: key,
        fields: JSON.stringify(params[key]),
      }),
    );
  }

  await Promise.all(promises);
}

async function getProductParams(...keys) {
  const data = await mysql.query(
    `SELECT * FROM ${tables.name.options}
    JOIN ${tables.name.product}
    ON ${tables.name.options}.product_key = ${tables.name.product}.product_key
    WHERE ${tables.name.product}.product_key IN (?)`,
    [keys],
  );

  if (data.length == 0) throw 'Product not found';

  return arrayToObject(
    data,
    el => el.product_key,
    el => {
      el.fields = JSON.parse(el.fields);
      delete el.product_key;
      return el;
    },
  );
}

async function getProductList() {
  const data = await mysql.query(`SELECT * FROM ${tables.name.product};`);
  return arrayToObject(
    data,
    el => el.product_key,
    el => {
      delete el.product_key;
      return el;
    },
  );
}

module.exports = {
  mysql,
  initialSetup,
  setProductParams,
  getProductParams,
  getProductList,
};
