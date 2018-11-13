const mongoose = require('mongoose');

const StoreSchema = mongoose.Schema({
  name: String,
  sort: String
});


module.exports = mongoose.model('Store', StoreSchema, 'stores');
