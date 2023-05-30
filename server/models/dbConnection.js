const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'parthkamal',
    database: 'hms',
    password: 'usePasswordForHMS1@'
});


const createDbConnection = (db) => {
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


module.exports = {db , createDbConnection};

