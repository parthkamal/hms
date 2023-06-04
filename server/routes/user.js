const express = require('express');
const router = express.Router();

const { validateUser, userValidationMiddleware, 
    validateLogin, loginValidationMiddleware } = require('../validators/user');
const { verifyToken, verifyTokenMiddleware } = require('../validators/token');

const { signupController,
    loginController,
    verifyController,
    resetPasswordController,
    getLoginController,
    getResetPasswordController,
    getSetPasswordController,
    postSetPasswordController,
    getVerifyController, 
    getSignupController} = require('../controllers/user');
    

router.get('/signup',getSignupController);
router.post('/signup', validateUser, userValidationMiddleware, signupController);
router.get('/login', getLoginController);
router.post('/login', validateLogin, loginValidationMiddleware, loginController)
router.get('/verify', getVerifyController);
router.post('/verify', verifyToken, verifyTokenMiddleware, verifyController)
router.get('/resetpassword', getResetPasswordController);
router.post('/resetpassword', resetPasswordController);
router.get('/setpassword', getSetPasswordController);
router.post('/setpassword', postSetPasswordController);


module.exports = router;
