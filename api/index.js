const express = require('express');
const routs = express.Router();
const products = require('./products');

const db = require('../lib/dbFunctions');

db.initialSetup({ recreate: true });

routs.use('/products', products);

module.exports = routs;
