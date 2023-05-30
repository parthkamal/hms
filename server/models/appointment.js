const { db } = require('./dbConnection');

const getAllAppointment = (callback) => {
    const query = 'select * from appointment';
    db.query(query, callback);

}

const getAppointmentById = (id, callback) => {
    const query = 'select * from appointment where id = ?';
    db.query(query, [id], callback);
}


const addAppointment = (patient_name, department, doctor_name, date, time, email, phone, callback) => {
    const query = 'insert into appointment (patient_name, department, doctor_name, date, time, email, phone) values ( ? , ? , ? , ? , ? , ? , ?) ';
    db.query(query, [patient_name, department, doctor_name, date, time, email, phone], callback);
}


const editAppointmentById = (patient_name, department, doctor_name, date, time, email, phone, id, callback) => {

    const query = 'update appointment set patient_name = ?, department = ? , doctor_name = ?, date = ?, time = ?, email = ?, phone = ? where id = ?';
    db.query(query, [patient_name, department, doctor_name, date, time, email, phone, id], callback);

}

const deleteAppointmentById = (id, callback) => {
    const query = 'delete from appointment where id = ?';
    db.query(query,[id],callback);
}


module.exports = {
    getAllAppointment,
    getAppointmentById,
    addAppointment,
    editAppointmentById,
    deleteAppointmentById
}