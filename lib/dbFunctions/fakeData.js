const { mysql } = require('../mysql');
const tables = require('../tables');
const faker = require('faker/locale/ru');
const translitRu = require('translit-russian');
const translit = require('translit')(translitRu);
const randomize = faker.helpers.randomize;
const randomNum = faker.random.number;

const product = require('./products');

const streets = [
  'ул. Советская',
  'ул. Ленина',
  'ул. Гагарина',
  'ул. Первомайская',
  'ул. Железнодорожная',
  'ул. Пушкина',
  'ул. Чапаева',
  'ул. Рабочая',
  'ул. Кирова',
];

function randomizeWeight(options) {
  const optionsArr = options.map(el => Array.from({ length: el.weight }, () => el.val)).flat();
  return randomize(optionsArr);
}

function generateFakeOrder() {
  const gender = randomize([0, 1]);
  const fname = faker.name.firstName(gender);
  const lname = faker.name.lastName(gender);

  const client = {
    lname,
    fname,
    patronymic: '',
    phone: faker.phone.phoneNumber('+7 (9##) ###-##-##'),
    addess: `${randomize(streets)} д. ${randomNum(59) + 1} кв. ${randomNum(89) + 1}`,
    email: faker.internet.email(translit(fname), translit(lname)),
  };

  return {
    date: faker.date.past(5),
    status: randomizeWeight([
      { val: 'new', weight: 5 },
      { val: 'approved', weight: 5 },
      { val: 'canceled', weight: 1 },
      { val: 'completed', weight: 10 },
    ]),
    client: JSON.stringify(client),
  };
}

async function getProductsList() {
  let products = await mysql.query(`SELECT * FROM ${tables.name.product}`);
  products = products.map(el => {
    el.fields = JSON.parse(el.fields);
    return el;
  });
  products = product.formatProductsInfo(products);
  products = products.map(prod => ({
    getPrice: product.calcPrice(prod.fields),
    data: prod,
  }));

  return products;
}

function generateFakeParams(product) {
  const params = {};

  for (let key in product.fields) {
    params[key] = getRandomParam(product.fields[key]);
  }

  return params;
}

function getRandomParam(field) {
  if (field.type === 'range') {
    return randomNum({ min: field.min, max: field.max, precision: 10 });
  }

  if (field.type === 'select') {
    const values = Object.keys(field.values);
    return randomize(values);
  }

  if (field.type === 'select-window') {
    return Array.from({ length: field.count }, (v, id) => {
      const val = {
        openTo: 'no',
        mosquitoNet: false,
      };

      if (id === 0) {
        val.openTo = randomizeWeight([
          { val: 'no', weight: 5 },
          { val: 'tilt', weight: 1 },
          { val: 'toLeft', weight: 2 },
          { val: 'tilt_toLeft', weight: 2 },
        ]);
      }
      if (id === field.count - 1) {
        val.openTo = randomizeWeight([
          { val: 'no', weight: 5 },
          { val: 'tilt', weight: 1 },
          { val: 'toRight', weight: 2 },
          { val: 'tilt_toRight', weight: 2 },
        ]);
      }
      if (val.openTo === 'no') {
        val.openTo = randomizeWeight([{ val: 'no', weight: 5 }, { val: 'tilt', weight: 1 }]);
      }

      if (val.openTo !== 'no') {
        val.mosquitoNet = randomize([true, false]);
      }

      return val;
    });
  }
}

function generateFakeProduct(productsList) {
  // Вероятность каждого товара в заказе. Для окон - 2, для двери 1
  const productId = randomizeWeight(
    productsList.map((prod, id) => ({
      val: id,
      weight: prod.data.type === 'window' ? 2 : 1,
    })),
  );
  const { data, getPrice } = productsList[productId];
  // Количество конструкций в заказе
  const count =
    data.type !== 'window'
      ? 1
      : randomizeWeight([{ val: 1, weight: 7 }, { val: 2, weight: 3 }, { val: 3, weight: 1 }]);

  const params = generateFakeParams(data);

  return {
    name: data.name,
    type: data.type,
    cost: +getPrice(params).toFixed(2),
    count,
    area: product.getArea(params),
    params: JSON.stringify(product.formatParams(params, data.fields)),
  };
}

async function generateFakeOrders(count, seed = null) {
  faker.seed(seed);
  const orders = Array.from({ length: count }, generateFakeOrder).sort((a, b) => a.date - b.date);
  const productsList = await getProductsList();

  // Количество каждой конструкции
  const ordersProducts = orders.map(order => {
    const productsCount = randomizeWeight([
      { val: 1, weight: 5 },
      { val: 2, weight: 3 },
      { val: 3, weight: 1 },
    ]);

    return {
      order,
      cart: Array.from({ length: productsCount }, () => generateFakeProduct(productsList)),
    };
  });

  const ordersArray = ordersProducts.map(order => {
    order.order.price = order.cart.reduce((acc, val) => acc + val.cost * val.count, 0);
    return order.order;
  });

  const { insertId } = (await mysql.insertArrayOfObjects(tables.name.orders, ordersArray))[0];

  const productsArray = ordersProducts
    .map((ord, id) => ord.cart.map(el => ({ ...el, order_id: insertId + id })))
    .flat();

  const createdProducts = (await mysql.insertArrayOfObjects(
    tables.name.order_products,
    productsArray,
  )).reduce((acc, el) => acc + el.affectedRows, 0);

  console.log(`[fakeData - generateFakeOrders] Добавлены фейковые заказы (${count})`);
  return createdProducts;
}

module.exports = { generateFakeOrders };
