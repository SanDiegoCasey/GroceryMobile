'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { StoredStore } = require('../models/storedStores');

router.get('/', (req, res, next) => {
  StoredStore
    .find()
    .then(stores => {
      res.json(stores);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something screwed up KC'});
    });
});

router.post('/', (req, res, next) => {
  const store = {
    prodId: req.body.prodId,
    name: req.body.name,
    location: req.body.location,
  };
  res.status(201).json({
    message: 'new store will be created',
    store: store
  });
});

router.get('/:storeID', (req, res, next) => {
  res.status(201).json({
    message: 'store details will got and shown here',
    storeID: req.params.storeID
  });
});

router.patch('/:storeID', (req, res, next) => {
  res.status(200).json({
    message: 'store details have been changed'
  });
});

router.delete('/:storeID', (req, res, next) => {
  res.status(200).json({
    message: `The store ${req.params.storeID} has been removed.`
  });
});





module.exports = router;
