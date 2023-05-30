const {db} = require('./dbConnection');


// ======================================================================

const addDoctor = (first_name, last_name, email, dob, gender, address, image, phone, department, biography, callback) => {
    const query = 'insert into doctor (first_name, last_name, email, dob, gender, address, image, phone, department, biography )  values (?,?,?,?,?,?,?,?,?,?)';
    db.query(query, [first_name, last_name, email, dob, gender, address, image, phone, department, biography], callback);
}


const editDoctor = (first_name, last_name, email, dob, gender, address, phone, department, biography, id, callback) => {
    const query = 'update doctor set first_name = ? , last_name = ? , email = ? , dob = ? , gender = ? , address = ? , phone = ?, department = ? , biography = ? where id = ? ';
    db.query(query, [first_name, last_name, email, dob, gender, address, phone, department, biography, id], callback);
}

const getDoctorById = (id, callback) => {
    const query = 'select * from doctor where id = ? ';
    db.query(query, [id], callback);

}

const getAllDoctor = (callback) => {
    const query = 'select * from doctor';
    db.query(query, callback);
}

const searchDoctor = (key, callback) => {
    const query = `select * from doctor where first_name  like '%${key}%'`;
    db.query(query, callback);
    console.log(query);
}


const deleteDoctorById = (id, callback) => {
    const query = 'delete from doctor where id = ? ';
    db.query(query, [id], callback);
}

const getAllDepartment = (callback) => {
    const query = 'select * from department';
    db.query(query, callback);
    console.log(query);
}







module.exports = {
   
    editDoctor,
    getDoctorById,
    addDoctor,
    getAllDoctor,
    searchDoctor,
    deleteDoctorById,
    getAllDepartment,
};








