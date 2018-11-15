const mongoose = require('mongoose');

const StoreSchema = mongoose.Schema({
  name: String,
  sort: String,
});

let Store = mongoose.model('Store', StoreSchema);
module.export={Store, StoreSchema};
