const { db } = require('./dbConnection');


const getAllStore = (callback) => {
    const query = 'select * from store order by id desc';
    db.query(query, callback)
}

const getStoreById =(id, callback) => {
    const query = 'select * from store where id = ?';
    db.query(query,[id],callback);
}


const addStore = (name, p_date, expire, expire_end, price, quantity, callback) => {
    const query = 'insert into store (name, p_date, expire, expire_end, price, quantity) values ( ? , ? , ? , ? , ? , ? )';
    db.query(query,[name,p_date,expire,expire_end,price,quantity],callback);
}


const editStoreById = (name,p_date,expire,expire_end, price, quantity, id, callback) => {
    const query = 'update store set name = ? , p_date = ? , expire = ? , expire_end = ? , price = ? , quantity = ? where id = ?';
    db.query(query,[name,p_date,expire,expire_end,price,quantity, id],callback);
}

const deleteStoreById = (id,callback)=> {
    const query = 'delete from store where id = ?';
    db.query(query,[id],callback);
}

const searchStore =(key, callback ) => {
    const query = `select * from store where name like '%${key}%'`;
    db.query(query,[key],callback);
    
}


module.exports = {
    getAllStore,
    getStoreById,
    addStore,
    editStoreById,
    deleteStoreById,
    searchStore

}