const mongoose = require('mongoose');

const PriceSchema = mongoose.Schema({
  price: String
});

const LocationSchema = mongoose.Schema({
  location: String
});

const ProductSchema = mongoose.Schema({
  name: String,
  unit: String,
  sort: String,
  prices: [ PriceSchema ],
  locations: [LocationSchema]
});

module.exports = mongoose.model('Product', ProductSchema, 'products');
