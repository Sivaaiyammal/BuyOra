const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  itemcode: { type: String, required: true, unique: true },
  weight: String,
  sizeStock: [  {    size: { type: String, required: true },
    stock: { type: String, required: true }  }],
  colors: [String],
  description: String,
  tax: String,
  gstNumber: String,
  price: Number,
  discount: Number,
  // stock: Number,
  images: [String],
  category: String
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
