const { db } = require('./dbConnection');

const postComplain =(message, name, email, subject, callback ) => {
    const query = 'insert into complain (message,name, email, subject) values ( ?, ?, ?, ? ) '; 
    db.query(query,[message,name,email,subject],callback); 

}

const getComplain = (callback) => {
    const query = 'select * from complain'; 
    db.query(query,callback);
}


module.exports = {
    postComplain,
    getComplain
}
