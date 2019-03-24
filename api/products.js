const express = require('express');
const routs = express.Router();

const db = require('../lib/dbFunctions');
const { mergeObjects, arrayToObject } = require('../lib/functions');

routs.get('/', async function(req, res) {
  if (req.query.extended) {
    const productList = await db.getProductParams();
    res.json(productList);
  } else {
    const productList = await db.getProductList();
    res.json(productList);
  }
});

routs.put('/', function(req, res) {
  const keys = Object.keys(req.body);

  db.getProductParams(...keys)
    .then(async oldData => {
      oldData = arrayToObject(oldData, el => el.product_key);
      const newData = mergeObjects(oldData, req.body);
      await db.setProductParams(newData);

      const products = await db.getProductParams();
      res.json(products);
    })
    .catch(err => {
      res.status(404).send();
    });
});

routs.get('/:id', async function(req, res) {
  db.getProductParams(req.params.id)
    .then(data => res.json(data[0]))
    .catch(err => {
      res.status(404).send();
    });
});

module.exports = routs;
