const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  products: [productSchema],
  stores: [storeSchema]
});

module.exports = mongoose.model('User', userSchema, 'users');
