const express = require('express');
const routs = express.Router();

const db = require('../lib/dbFunctions');

routs.get('/', async function(req, res) {
  if (req.query.extended) {
    const productList = await db.getProductParams('w1', 'w2', 'w3');
    res.json(productList);
  } else {
    const productList = await db.getProductList();
    res.json(productList);
  }
});

routs.get('/:id', async function(req, res) {
  db.getProductParams(req.params.id)
    .then(data => res.json(data))
    .catch(err => {
      res.status(404).send();
    });
});

module.exports = routs;
