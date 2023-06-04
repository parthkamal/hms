const {db} = require('./dbConnection');


const getAllDepartment = (callback) => {
    const query = 'select * from departments';
    db.query(query,callback);
}

const addDepartment = (name, desc, callback) => {
    const query = 'insert into departments (department_name, department_desc) values ( ?, ?) ';
    db.query(query,[name,desc],callback);
}

const getDepartmentById =(id,callback) => {
    const query = 'select * from departments where id = ?';
    db.query(query,[id],callback);
}


const deleteDepartmentById = (id, callback) => {
    const query = 'delete from departments where id = ? ';
    db.query(query,[id],callback);
}

const editDepartment = (id,name, desc,callback) => {
    const query = 'update departments set department_name = ? , department_desc = ?where id = ? ';
    db.query(query,[name,desc,id],callback);
}










module.exports = {
    getAllDepartment,
    addDepartment,
    getDepartmentById,
    deleteDepartmentById,
    editDepartment
}




