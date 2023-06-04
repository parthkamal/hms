const express = require('express');

const { getReceiptController,
    getAllReceiptController,
    getGenerateSlipController } = require('../controllers/receipt');


const router = express.Router();


router.get('*', getReceiptController);
router.get('/', getAllReceiptController);
router.get('/generateslip/:id', getGenerateSlipController);


module.exports = router;