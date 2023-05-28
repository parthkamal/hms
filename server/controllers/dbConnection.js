const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'parthkamal',
    database: 'hms',
    password: 'usePasswordForHMS1@'
});

module.exports = db;

