const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  gender: String,
  weight: String,
  size: [String],
  colors: [String],
  description: String,
  tax: String,
  gstNumber: String,
  price: Number,
  discount: Number,
  stock: Number,
  images: [String],
  category: String
});

module.exports = mongoose.model('Product', productSchema);
