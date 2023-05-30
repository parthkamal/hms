const {db} = require('./dbConnection');






//===================================================================================================================

const getAllLeave = (callback) => {
    const query = 'select * from leaves';
    db.query(query, callback);
}

const getLeaveById = (id, callback) => {
    const query = 'select * from leaves where id = ? ';
    db.query(query, [id], callback);
}


const addLeave = (id, employee, emp_id, leave_type, date_from, date_to, reason, callback) => {
    const query = 'insert into leaves (id, employee, emp_id, leave_type, date_from, date_to, reason ) values ( ? , ? , ? , ? , ? , ?, ?) ';
    db.query(query, [id, employee, emp_id, leave_type, date_from, date_to, reason], callback);
}


const editLeaveById = (id, employee, emp_id, leave_type, date_from, date_to, reason, callback) => {
    const query = 'update leaves set employee = ? , emp_id = ? , leave_type = ? , date_from = ? , date_to = ? , reason = ? where id = ?';
    db.query(query, [employee, emp_id, leave_type, date_from, date_to, reason, id], callback);
}

const deleteLeaveById = (id, callback) => {
    const query = 'delete from leaves where id = ?';
    db.query(query, [id], callback);
}




module.exports = {
    getAllLeave,
    getLeaveById,
    editLeaveById,
    deleteLeaveById,
    addLeave
};








