const mongoose = require('mongoose');

const selectedProductSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      }
})

const Selectedproduct = mongoose.model('SelectedProduct', selectedProductSchema)

module.exports = Selectedproduct