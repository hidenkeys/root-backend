const jwt = require('jsonwebtoken');
const User = require('../models/user');
const SelectedProduct = require('../models/selectedProduct');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const cookieParser = require('cookie-parser');

exports.add_to_cart = async (req, res, next) => {
  const token = req.cookies.authcookie;
  const decoded = jwt.verify(token, process.env.JWT_TOKEN);
  req.user = decoded;

  if (!token) {
    return res.status(401).json({ error: 'User not authorized' });
  }

  try {
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { productID, quantity } = req.body;

    const product = await Product.findById(productID);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const cart = await Cart.findOne({ user: user._id });

    if (product.stock.ski < quantity) {
      return res.status(400).json({ error: 'Out of stock' });
    }

    const selectedProduct = new SelectedProduct({
      product: productID,
      cart: cart._id,
      quantity: quantity,
      price: product.price * quantity,
    });

    await selectedProduct.save();

    
    const fPrice = selectedProduct.price + cart.total;

    cart.selectedProducts.push(selectedProduct._id);
    if (!isNaN(fPrice)){
      cart.total = fPrice;
    } else {
      cart.total = selectedProduct.price;
    }

    await cart.save();
    res.status(201).send(`Product ${cart.selectedProducts.product.name} has been added to cart ${selectedProduct.cart}`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred.' });
  }
};
