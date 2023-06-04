const express = require('express');

const { getComplainController, getAllComplainController, postComplainController
 } = require('../controllers/complain');

const router = express.Router();


router.get('*',getComplainController);
router.get('/',getAllComplainController);
router.post('/',postComplainController);


module.exports = router ; 
