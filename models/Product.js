const mongoose = require("mongoose");
const SelectedProduct = require('./selectedProduct.js')

const Stock = new mongoose.Schema({
  ski: Number
})

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    uniqe: true
  },
  avatar: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['screen', 'battery', 'charging-port', 'back-glass', 'my phone is not coimng on']
  },
  cloudinary_id: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: Stock,
  selectedProducts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: SelectedProduct
  }
  
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
