const express = require('express');

const router = express.Router();

router.get('/', (request,response) =>{

	//req.session.username = null;
	response.clearCookie('username');
	response.redirect('/login');
});

module.exports = router;