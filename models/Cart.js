const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'User',
     unique: true
     },
  selectedProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'selectedProduct'
  }],
  total: {
    type: Number,
    required: true
  }
  
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
