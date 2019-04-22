const { connection, mysql, DB_NAME } = require('../mysql');
const table = require('./mysqlTableNames');
const sqlTables = require('./sqlTables');
const defaultProduct = require('../defaultProducts');

async function initTables(clearTables = false) {
  // Подключение к базе данных
  await connectToDatabase();

  let db_tables = (await mysql.query(`SHOW TABLES`)).map(tab => tab[`Tables_in_${DB_NAME}`]);
  const dbHasAllTables = table.allNames.every(val => db_tables.includes(val));

  if (dbHasAllTables && !clearTables) return false;

  if (!dbHasAllTables) {
    await createTables();
  }
  if (clearTables) {
    await clearData();
  }

  await createProducts();
  return true;
}

async function connectToDatabase() {
  try {
    await mysql.query(`USE ${DB_NAME}`);
    console.log(`[tables - connectToDatabase] Подключено к базе данных "${DB_NAME}"`);
  } catch (err) {
    if (err.code != 'ER_BAD_DB_ERROR') throw err;

    // Создать БД
    await createDatabase();
    console.log(`[tables - connectToDatabase] Создана база данных "${DB_NAME}"`);
  }
}

async function clearData() {
  await mysql.query(`SET FOREIGN_KEY_CHECKS=0;`);
  await Promise.all(table.allNames.map(name => mysql.query(`TRUNCATE ${name};`)));
  await mysql.query(`SET FOREIGN_KEY_CHECKS=1;`);
  console.log(`[tables - clearData] Удалены данные из таблиц`);
}

async function createDatabase() {
  await mysql.query(`CREATE DATABASE ${DB_NAME} CHARACTER SET utf8 COLLATE utf8_general_ci;`);
  await mysql.query(`USE ${DB_NAME};`);
}

async function createTables() {
  // Создание таблиц
  await Promise.all([
    mysql.query(sqlTables.users),
    mysql.query(sqlTables.product),
    mysql.query(sqlTables.orders),
    mysql.query(sqlTables.orderProducts),
  ]);

  // Создание связей
  await mysql.query(sqlTables.foreignOrder);
  console.log(`[tables - createTables] Созданы таблицы`);
}

async function createProducts() {
  await Promise.all([
    mysql.upsert(table.product, {
      product_key: 'w1',
      name: 'Окно',
      fields: JSON.stringify(defaultProduct.window1),
      image: '/img/w1.png',
    }),
    mysql.upsert(table.product, {
      product_key: 'w2',
      name: 'Окно двухстворчатое',
      fields: JSON.stringify(defaultProduct.window2),
      image: '/img/w2.png',
    }),
    mysql.upsert(table.product, {
      product_key: 'w3',
      name: 'Окно трёхстворчатое',
      fields: JSON.stringify(defaultProduct.window3),
      image: '/img/w3.png',
    }),
    mysql.upsert(table.product, {
      product_key: 'd1',
      name: 'Дверь балконная',
      fields: JSON.stringify(defaultProduct.door1),
      image: '/img/d1.png',
    }),
  ]);

  console.log(`[tables - createProducts] Добавлены товары`);
}

module.exports = {
  name: table,
  createTables: initTables,
};
