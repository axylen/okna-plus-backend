const express = require('express');
const routs = express.Router();
const products = require('./products');
const orders = require('./orders');

const db = require('../lib/dbFunctions');

db.initialSetup({ recreate: true });

routs.use('/products', products);
routs.use('/orders', orders);

module.exports = routs;
