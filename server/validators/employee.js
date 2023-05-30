const { check, validationResult } = require('express-validator')

const verifyLeave = [
    check('id').notEmpty().withMessage('id is required'),
    check('name').notEmpty().withMessage('name is required'),
    check('leave_type').notEmpty().withMessage('leave_type is required'),

    check('from').notEmpty().withMessage('from is required'),

    check('to').notEmpty().withMessage('to is required'),
    check('reason').notEmpty().withMessage('reason is required'),
];

const verifyLeaveMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};


module.exports = { verifyLeave, verifyLeaveMiddleware };