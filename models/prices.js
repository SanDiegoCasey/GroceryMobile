const mongoose = require('mongoose');

const PriceSchema = mongoose.Schema({
  price: String,
  store: [storeSchema]
});

module.exports = mongoose.model('Price', PriceSchema);
