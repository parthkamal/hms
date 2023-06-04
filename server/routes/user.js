const express = require('express');
const router = express.Router();
const { validateUser, userValidationMiddleware } = require('../validators/user');

const { signupController,
    loginController,
    verifyController,
    resetPasswordController,
    getLoginController } = require('../controllers/user');
const { verifyToken, verifyTokenMiddleware } = require('../validators/token');


router.post('/signup', validateUser, userValidationMiddleware, signupController);
router.get('/login', getLoginController);
router.post('/login', validateUser, userValidationMiddleware, loginController)
router.post('/verify', verifyToken, verifyTokenMiddleware, verifyController)
router.post('/reset', resetPasswordController);


module.exports = router;
