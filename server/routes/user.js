const express = require('express');
const router = express.Router();
const { validateUser, userValidationMiddleware } = require('../validators/user');
const { signupController, loginController, verifyController } = require('../controllers/user');
const { verifyToken, verifyTokenMiddleware } = require('../validators/token');


router.post('/signup', validateUser, userValidationMiddleware, signupController);
router.post('/login',validateUser, userValidationMiddleware ,loginController)
router.post('/verify',verifyToken, verifyTokenMiddleware ,verifyController)


module.exports = router;