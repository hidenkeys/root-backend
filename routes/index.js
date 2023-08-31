const router = require('express').Router();
const userController = require('../controllers/userController.js');
const { verifyUserToken, IsUser, IsAdmin } = require('../middlewares/auth')

// Register a new User
router.post('/register', userController.register);

// Login
router.post('/login', userController.login);

router.use(verifyUserToken)

router.get('/events', IsUser, userController.userEvent);

// Auth Admin only
router.get('/special', IsAdmin, userController.adminEvent);

router.post('/otpEvent', IsUser, userController.otpEvent);

router.post('/verifyOtp', IsUser, userController.verifyOtp);

module.exports = router;