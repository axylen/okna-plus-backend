const t = require('./mysqlTableNames');

const product = `CREATE TABLE IF NOT EXISTS ${t.product} (
    id INTEGER AUTO_INCREMENT,
    product_key VARCHAR(10) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL DEFAULT 'Товар',
    image VARCHAR(255) DEFAULT NULL,
    type VARCHAR(20) NOT NULL,
    fields MEDIUMTEXT NULL DEFAULT NULL,
    PRIMARY KEY (id)
  );`;

const orders = `CREATE TABLE IF NOT EXISTS ${t.orders} (
  id INTEGER AUTO_INCREMENT,
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  client MEDIUMTEXT NULL DEFAULT NULL,
  status VARCHAR(10) NULL DEFAULT NULL,
  price DECIMAL(8,2) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);`;

const orderProducts = `CREATE TABLE IF NOT EXISTS ${t.order_products} (
  id INTEGER AUTO_INCREMENT,
  order_id INTEGER NOT NULL,
  name VARCHAR(50) NOT NULL,
  type VARCHAR(20) NOT NULL,
  cost DECIMAL(8,2) NULL DEFAULT NULL,
  count INTEGER NOT NULL DEFAULT 1,
  area DECIMAL(8,2)  NULL DEFAULT NULL,
  params MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);`;

const users = `CREATE TABLE IF NOT EXISTS ${t.users} (
  id INTEGER AUTO_INCREMENT,
  login VARCHAR(20) UNIQUE,
  password VARCHAR(128),
  PRIMARY KEY (id)
);`;

const foreignOrder = `ALTER TABLE ${t.order_products} ADD FOREIGN KEY (order_id) REFERENCES ${t.orders} (id);`;

module.exports = {
  product,
  orders,
  orderProducts,
  users,
  foreignOrder,
};
