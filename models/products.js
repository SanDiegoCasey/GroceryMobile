const mongoose = require('mongoose');

const PriceSchema = mongoose.Schema({
  price: String
});

const ProductSchema = mongoose.Schema({
  name: String,
  size: String,
  sort: String,
  prices: [ PriceSchema ],
  userID: String
});

module.exports = mongoose.model('StoredProduct', ProductSchema, 'products');
