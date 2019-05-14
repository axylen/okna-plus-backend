const express = require('express');
const routs = express.Router();
const products = require('./products');
const orders = require('./orders');
const user = require('./user');
const stats = require('./stats');
const { RECREATE_DB } = require('../config');

const db = require('../lib/dbFunctions');

db.initialSetup({ recreate: RECREATE_DB });

routs.use('/products', products);
routs.use('/orders', orders);
routs.use('/user', user);
routs.use('/stats', stats);

module.exports = routs;
