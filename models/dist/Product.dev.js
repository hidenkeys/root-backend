"use strict";

var mongoose = require("mongoose");

var SelectedProduct = require('./selectedProduct.js');

var Stock = new mongoose.Schema({
  ski: Number
});
var productSchema = new mongoose.Schema({
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
    "enum": ['screen', 'battery', 'charging-port', 'back-glass', 'my phone is not coimng on']
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
var Product = mongoose.model('Product', productSchema);
module.exports = Product;