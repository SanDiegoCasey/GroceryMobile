'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Store = require('../models/stores');
mongoose.Promise = global.Promise;


router.get('/', (req, res) => {
  Store
    .find()
    .then(stores => {
      res.json(stores);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'problem get /'});
    });
});

router.get('/user/:id', (req, res) => {
  Store
    .find({
      userID: req.params.id
    })
    .then(stores => {
      res.json(stores);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'problem get /user/:id'
      });
    });
});

router.post('/user/:id', (req, res) => {

  Store.create({
    userID: req.body.userID,
    name: req.body.name,
    sort: 'list'
  }).then(item => {
    res.status(201).json(item);
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });

  // router.get('/:storeID', (req, res) => {
  //   res.status(201).json({
  //     message: 'store details will got and shown here',
  //     storeID: req.params.storeID
  //   });
  // });
});

// router.patch('/:storeID', (req, res) => {
//   res.status(200).json({
//     message: 'store details have been changed'
//   });
// });
//
// router.delete('/:storeID', (req, res) => {
//   res.status(200).json({
//     message: `The store ${req.params.storeID} has been removed.`
//   });
// });
//
//
//
//
//
// module.exports = router;
//
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


router.put('/remove/:id', (req,res,next) =>{
  // res.status(200).json(req.params.id)

  Store
    .findOneAndUpdate({_id:req.params.id}, {$set:{sort:'bank'}})
    .then(result =>{
      res.status(200).json(result);

    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.put('/add/:id', (req,res,next) =>{
  // res.status(200).json(req.params.id)

  Store
    .findOneAndUpdate({_id:req.params.id}, {$set:{sort:'list'}})
    .then(result =>{
      res.status(200).json(result);

    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});



module.exports = router;
