const { db } = require('./dbConnection');


const getAllReceipt = (callback) => {
    const query = 'select * from receipt'; 
    db.query(query,callback);
}



module.exports = {
    getAllReceipt, 
    
}