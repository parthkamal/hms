const { check, validationResult } = require('express-validator');


const validateUser = [
    check('username').notEmpty().withMessage('Username is required'),
    check('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    check('password').notEmpty().withMessage('passowrd is required')
    // Add more validation checks for other fields
];

const userValidationMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { validateUser, userValidationMiddleware };
