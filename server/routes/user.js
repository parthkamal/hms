const express = require('express');
const router = express.Router();
const { validateUser, userValidationMiddleware } = require('../validators/user');
const { signupController, loginController } = require('../controllers/user');


router.post('/signup', validateUser, userValidationMiddleware, signupController);
router.post('/login',validateUser, userValidationMiddleware ,loginController)

module.exports = router;