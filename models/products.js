const mongoose = require('mongoose');

const PriceSchema = mongoose.Schema({
  price: String
});

const ProductSchema = mongoose.Schema({
  name: String,
  size: String,
  sort: String,
  userID: String,
  prices: [ PriceSchema ]
});

module.exports = mongoose.model('Product', ProductSchema, 'products');
