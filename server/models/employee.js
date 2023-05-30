const db = require('./dbConnection');



//============================================================================================

const getAllEmployee = (callback) => {
    const query = 'select * from employee';
    db.query(query, callback);
}

const getEmployeeById = (id, callback) => {
    const query = 'select * from employee where id = ?';
    db.query(query, [id], callback);
}

const addEmployee = (name, email, contact, join_date, role, salary, callback) => {
    const query = 'insert into employee (name, email, contact, join_date, role, salary) values (? , ? , ? ,?, ?, ? ) ';
    db.query(query, [name, email, contact, join_date, role, salary], callback);
}


const editEmployeeById = (name, email, contact, join_date, role, salary, id, callback) => {
    const query = 'update employee set name = ? , email = ? , contact = ? , join_date = ?, role = ? , salary = ? where id = ?';
    db.query(query, [name, email, contact, join_date, role, salary, id], callback);
}

const deleteEmployeeById = (id, callback) => {
    const query = 'delete from employee where id = ?';
    db.query(query, [id], callback);
}


const searchEmployee = (key, callback) => {
    const query = `select * from doctor where name like '%${key}%'`;
    db.query(query, callback);
    console.log(query);
}





module.exports = {
    getAllEmployee,
    addEmployee,
    getEmployeeById,
    editEmployeeById,
    deleteEmployeeById,
    searchEmployee,
};








