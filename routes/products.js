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
    .find()
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

router.get('/user/:id', (req, res, next) => {
  StoredProduct
    .find({
      userID: req.params.id
    })
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



router.post('/user/:id', jsonParser, (req, res) => {
  const requiredFields = ['name', 'size', 'prices'];
  console.log(`from router ${req.body}`);
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  console.log(req.body);
  StoredProduct.create({
    name: req.body.name,
    size: req.body.size,
    prices: req.body.prices,
    sort: 'list',
    userID: req.body.userID
  }).then(item => {
    res.status(201).json(item);
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });

});

router.put('/add/:id', (req, res, next) => {
  // res.status(200).json(req.params.id)

  StoredProduct
    .findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: {
        sort: 'bank'
      }
    })
    .then(result => {
      res.status(200).json(result);

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.put('/remove/:id', (req, res, next) => {

  StoredProduct
    .findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: {
        sort: 'list'
      }
    })
    .then(result => {
      res.status(200).json(result);

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.put('/:id', (req, res) => {

  let pricesArray = [];

  for (let i = 0; i < req.body.prices.length; i++) {
    pricesArray.push(req.body.prices[i]);
  }

  let storeProduct = {
    size: req.body.size,
    prices: pricesArray
  };

  StoredProduct
    .findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: storeProduct
    })
    .then(result => {
      res.status(200).json(result);

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get('/:productID', (req, res, next) => {
  StoredProduct
    .findOne({
      _id: req.params.productID
    })
    .then(product => {
      res.status(201).json(product);
    });
});

router.delete('/:productID', (req, res) => {
  StoredProduct
    .deleteOne({ _id: req.params.productID}).then(data =>
      res.status(204).end()).catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
