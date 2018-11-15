const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  products: [productSchema],
  stores: [storeSchema]
});

userSchema.methods.serializethis = function() {
  return {
    username: this.username || '',
    products: this.products || [],
    stores: this.stores || []
  };
};

module.exports = mongoose.model('User', userSchema, 'users');
