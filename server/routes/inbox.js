const express = require ('express');
const { getComplain } = require('../models/complain');
const router = express.Router();

router.get('*', function(request, response, next){
	if(request.cookies['username'] == null){
		response.redirect('/login');
	}else{
		next();
	}
});

router.get('/',function(request,response){
    getComplain(function(err,result){
        response.render('inbox.ejs',{list :result});
    })
});

module.exports = router;
