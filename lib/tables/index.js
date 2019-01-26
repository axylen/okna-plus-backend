const { connection, mysql, DB_NAME } = require('../mysql');
const table = require('./mysqlTableNames');
const sqlTables = require('./sqlTables');

async function initTables(clearTables = false) {
  // Подключение к базе данных
  try {
    await mysql.query(`USE ${DB_NAME}`);
  } catch (err) {
    // Если такой БД нет - создать
    if (err.code == 'ER_BAD_DB_ERROR') {
      await createDatabase();
    } else throw err;
  }

  const db_tables = (await mysql.query(`SHOW TABLES;`)).map(tab => tab[`Tables_in_${DB_NAME}`]);
  const dbHasAllTables = table.allNames.every(val => db_tables.includes(val));

  if (!dbHasAllTables) {
    await createTables();
    await createProducts();
    return true;
  }
  if (clearTables) {
    await clearDatabase();
    await createProducts();
    return true;
  }

  return false;
}

async function clearDatabase() {
  await mysql.query(`SET FOREIGN_KEY_CHECKS=0;`);
  await Promise.all(table.allNames.map(name => mysql.query(`TRUNCATE ${name};`)));
  await mysql.query(`SET FOREIGN_KEY_CHECKS=1;`);
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
    mysql.query(sqlTables.options),
    mysql.query(sqlTables.orders),
    mysql.query(sqlTables.orderProducts),
  ]);

  // Создание связей
  await Promise.all([mysql.query(sqlTables.foreignOrder), mysql.query(sqlTables.foreignProduct)]);
}

async function createProducts() {
  await Promise.all([
    mysql.upsert(table.product, {
      product_key: 'w1',
      name: 'Окно',
    }),
    mysql.upsert(table.product, {
      product_key: 'w2',
      name: 'Окно двухстворчатое',
    }),
    mysql.upsert(table.product, {
      product_key: 'w3',
      name: 'Окно трёхстворчатое',
    }),
  ]);
}

module.exports = {
  name: table,
  createTables: initTables,
};