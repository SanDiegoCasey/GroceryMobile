const mongoose = require('mongoose');
const {storeSchema} = require('./stores');

const PriceSchema = mongoose.Schema({
  price: String,
  store: [storeSchema]
});

const ProductSchema = mongoose.Schema({
  name: String,
  unit: String,
  sort: String,
  prices: [ PriceSchema ]
});

module.exports = mongoose.model('Product', ProductSchema, 'products');
