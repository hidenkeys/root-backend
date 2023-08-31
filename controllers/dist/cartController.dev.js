"use strict";

var jwt = require('jsonwebtoken');

var User = require('../models/user');

var SelectedProduct = require('../models/selectedProduct');

var Product = require('../models/Product');

var Cart = require('../models/Cart');

var cookieParser = require('cookie-parser');

exports.add_to_cart = function _callee(req, res, next) {
  var token, decoded, user, _req$body, productID, quantity, product, cart, selectedProduct, fPrice;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          token = req.cookies.authcookie;
          decoded = jwt.verify(token, process.env.JWT_TOKEN);
          req.user = decoded;

          if (token) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            error: 'User not authorized'
          }));

        case 5:
          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(User.findOne({
            email: decoded.email
          }));

        case 8:
          user = _context.sent;

          if (user) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            error: 'User not found'
          }));

        case 11:
          _req$body = req.body, productID = _req$body.productID, quantity = _req$body.quantity;
          _context.next = 14;
          return regeneratorRuntime.awrap(Product.findById(productID));

        case 14:
          product = _context.sent;

          if (product) {
            _context.next = 17;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            error: 'Product not found'
          }));

        case 17:
          _context.next = 19;
          return regeneratorRuntime.awrap(Cart.findOne({
            user: user._id
          }));

        case 19:
          cart = _context.sent;

          if (!(product.stock.ski < quantity)) {
            _context.next = 22;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            error: 'Out of stock'
          }));

        case 22:
          selectedProduct = new SelectedProduct({
            product: productID,
            cart: cart._id,
            quantity: quantity,
            price: product.price * quantity
          });
          _context.next = 25;
          return regeneratorRuntime.awrap(selectedProduct.save());

        case 25:
          fPrice = selectedProduct.price + cart.total;
          cart.selectedProducts.push(selectedProduct._id);

          if (!isNaN(fPrice)) {
            cart.total = fPrice;
          } else {
            cart.total = selectedProduct.price;
          }

          _context.next = 30;
          return regeneratorRuntime.awrap(cart.save());

        case 30:
          res.status(201).send("Product ".concat(cart.selectedProducts.product.name, " has been added to cart ").concat(selectedProduct.cart));
          _context.next = 37;
          break;

        case 33:
          _context.prev = 33;
          _context.t0 = _context["catch"](5);
          console.error(_context.t0);
          res.status(500).json({
            error: 'An error occurred.'
          });

        case 37:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 33]]);
};