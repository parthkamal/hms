const { check, validationResult } = require('express-validator')

const verifyToken = [
    check('id').notEmpty().withMessage('id is required'),
    check('token').notEmpty().withMessage('token is required')
];

const verifyTokenMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};


module.exports = { verifyToken, verifyTokenMiddleware };