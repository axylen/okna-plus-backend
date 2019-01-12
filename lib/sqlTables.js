const product = `CREATE TABLE product (
    product_key VARCHAR(10) NOT NULL,
    name VARCHAR(50) NOT NULL DEFAULT 'Товар',
    image VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (product_key)
  );`;

const options = `CREATE TABLE options (
  product_key VARCHAR(10),
  fields MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (product_key)
);`;

const orders = `CREATE TABLE orders (
  id INTEGER AUTO_INCREMENT,
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  client MEDIUMTEXT NULL DEFAULT NULL,
  status VARCHAR(10) NULL DEFAULT NULL,
  price DECIMAL(8,2) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);`;

const orderProducts = `CREATE TABLE order_products (
  id INTEGER AUTO_INCREMENT,
  order_id INTEGER NOT NULL,
  price DECIMAL(8,2) NULL DEFAULT NULL,
  count INTEGER NOT NULL DEFAULT 1,
  item MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);`;

const users = `CREATE TABLE users (
  login VARCHAR(20),
  password VARCHAR(32),
  PRIMARY KEY (login)
);`;

const foreignProduct = `ALTER TABLE options ADD FOREIGN KEY (product_key) REFERENCES product (product_key);`;
const foreignOrder = `ALTER TABLE order_products ADD FOREIGN KEY (order_id) REFERENCES orders (id);`;

module.exports = {
  product,
  options,
  orders,
  orderProducts,
  users,
  foreignProduct,
  foreignOrder,
};
