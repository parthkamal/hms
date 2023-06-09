const { db } = require('./dbConnection');


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

const getUserByUsername = (username, callback) => {
    const query = 'select * from users where username = ? ';
    db.query(query, [username], callback);
}

const updateUser = (id, username, email, password, callback) => {
    const query = 'update users set username = ? , email = ? , password = ? where id = ?';
    db.query(query, [username, email, password, id], callback);
}


const checkToken = function (token, callback) {
    var query = "select *from temp where token='" + token + "'";
    con.query(query, callback);
    console.log(query);
};

const setPassword = function (id, newpassword, callback) {
    var query =
        "update `users` set `password`='" + newpassword + "' where id=" + id;
    con.query(query, callback);
};







module.exports = {
    signup,
    verify,
    getTokenId,
    matchtoken,
    updateVerify,
    findOne,
    temp,
    getUserByUsername,
    updateUser,
    checkToken,
    setPassword
};








