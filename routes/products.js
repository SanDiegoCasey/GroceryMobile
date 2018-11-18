'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const StoredProduct = require('../models/products');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
mongoose.Promise = global.Promise;

router.get('/', (req, res, next) => {
  StoredProduct
    .find({userID: req.query.userId || ''})
    .then(products => {
      res.status(200).json(products);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['name', 'size', 'prices', 'userID'];
  console.log(`from router ${req.body}`);
  for (let i=0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  StoredProduct.create({
    name: req.body.name,
    size: req.body.size,
    sort: req.body.sort,
    userID: req.body.userID,
    prices: req.body.prices
  }).then(item => {
    res.status(201).json(item);
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });

});

module.exports = router;
