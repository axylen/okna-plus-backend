const { mysql } = require('./mysql');
const tables = require('./tables');
const defaultProduct = require('./defaultProducts');

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

async function getProductPrarams(...keys) {
  const res = await mysql.query(
    `SELECT * FROM ${tables.name.options} WHERE product_key IN (?)`,
    [keys],
  );

  if (res.length == 0) throw 'Product not found';

  for (let row of res) {
    row.fields = JSON.parse(row.fields);
  }

  return res;
}

module.exports = {
  mysql,
  initialSetup,
  setProductParams,
  getProductPrarams,
};
