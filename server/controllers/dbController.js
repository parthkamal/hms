const db = require('./dbConnection');

const createDbConnection = () => {
    db.connect((error) => {

        if (error) {
            console.error('error connecting: ' + error.stack);
            return;
        } else {
            console.log('you are connected to database');
        }
    });
    return;
}

const signup = (username, email, password, email_status) => {
    const query = `select email from users where email = ?`;

    db.query(query, [email], (error, result) => {
        if (result[0] == undefined) {
            let query = `insert into users (username, email, password, email_status) values (?, ? , ?, ?)`;
            db.query(query, [username, email, password, email_status], (err, data) => {
                if (err) console.log({ err });
                console.log({ data });
            })
        } else if (error) {
            console.log(error);
        } else {
            console.log({ result });
        }
    })
}

const verify = (username, email, token) => {
    db.query('select * from verify where email = ?', [email], (error, result) => {
        if (error) {
            console.log({ error });
            return
        }
        if (result.length > 0) {
            db.query('update verify set token = ? where email = ?', [token, email], (error, result) => {
                if (error) console.log(error);
                console.log(result);

            })
            return;
        }
    });

    console.log('lenght = 0');
    db.query('insert into verify ( username, email, token) values ( ? , ? , ? )', [username, email, token], (error, result) => {
        if (result) console.log('insert kar diya bhai ', result);
        else console.log('error during insertion', error);
    });
}

const getTokenId = (email, callback) => {
    let query = 'select * from verify where email = ?';
    db.query(query, [email], callback);
}

const matchtoken = (id, token, callback) => {
    console.log('matchtoken');
    let query = 'select * from verify where id = ? and token = ?';
    console.log(query);
    db.query(query, [id, token], callback);
}

const updateVerify = (email, email_status, callback) => {
    console.log('updateverify');
    const query = 'update users set email_status = ? where email = ?';
    db.query(query, [email_status, email], callback);
}

const findOne = (email, callback) => {
    const query = 'select * from users where email = ? ';
    db.query(query, [email], callback);
}

const temp = (id, email, token, callback) => {
    const query = 'insert into temp ( id, email, token ) values ( ? , ? , ? )';
    db.query(query, [id, email, token], callback);
}


const addDoctor = (first_name, last_name, email, dob, gender, address, image, phone, department, biography, callback) => {
    const query = 'insert into doctor (first_name, last_name, email, dob, gender, address, image, phone, department, biography )  values (?,?,?,?,?,?,?,?,?,?)';

    db.query(query,[first_name,last_name,email,dob,gender,address,image, phone, department, biography],callback);
}


const editDoctor = (first_name, last_name, email, dob, gender, address, phone, department, biography, id , callback) => {
    const query = 'update doctor set first_name = ? , last_name = ? , email = ? , dob = ? , gender = ? , address = ? , phone = ?, department = ? , biography = ? where id = ? ';
    db.query(query,[first_name,last_name,email,dob,gender, address, phone, department, biography, id], callback);
}

const getDoctorById = (id, callback) => {
    const query = 'select * from doctor where id = ? ';
    db.query(query,[id],callback);

}

const getAllDoctor = (callback) => {
    const query = 'select * from doctor'; 
    db.query(query,callback);
}

const searchDoctor = (key, callback) => {
    const query = `select * from doctor where first_name  like '%${key}%'`;
    db.query(query, callback);
    console.log(query);
}


const deleteDoctorById = (id,callback) => {
    const query = 'delete from doctor where id = ? ';
    db.query(query, [id],callback);
}

const getAllDepartment = (callback) => {
    const query = 'select * from department'; 
    db.query(query,callback);
    console.log(query);
}


module.exports = {
    createDbConnection,
    signup,
    verify,
    getTokenId,
    matchtoken,
    updateVerify,
    findOne,
    temp,
    editDoctor,
    getDoctorById,
    addDoctor,
    getAllDoctor, 
    searchDoctor, 
    deleteDoctorById,
    getAllDepartment
};




