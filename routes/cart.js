const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const userController = require('../controllers/userController.js');
const cartController = require('../controllers/cartController.js');
const { verifyUserToken, IsUser, IsAdmin } = require('../middlewares/auth')


router.use(verifyUserToken)

// Define cart routes here
router.post('/cart/add', IsUser, cartController.add_to_cart);


module.exports = router;
