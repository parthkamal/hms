const { postComplain } = require("../models/complain");

const getComplainController = (request,response, next) => {
    if (request.cookies['username'] == null ){
        response.redirect('/login');
    }else {
        next();
    }
} 

const getAllComplainController = (request,response ) => {
    response.render('complain.ejs');
}


const postComplainController = (request,response) => {
    const {
        message, 
        name, 
        email, 
        subject
    } = request.body; 


    postComplain(message,name,email,subject,(error,result) => {
        if(error) console.log({error});
        response.redirect('back');
    });
}



module.exports = {
    getComplainController,
    getAllComplainController,
    postComplainController
}