var express = require('express');
var router = express.Router();

router.get('/', (request,response) =>{

	//req.session.username = null;
	response.clearCookie('username');
	response.redirect('/login');
});

module.exports = router;