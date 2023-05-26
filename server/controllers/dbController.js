const mysql = require('mysql2');
const express = require('express');
const router = express.Router();



const createDbConnection = () => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'parthkamal',
        database: 'hms',
        password: process.env.DB_PASSWORD
    });

    connection.connect((error) => {

        if (error) {
            console.error('error connecting: ' + error.stack);
            return;
        } else {
            console.log('you are connected to database');
        }
    });


    return { connection };
}

const signup = (username, email, password, status, callback) => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOSTNAME,
        user: process.env.DB_USERNAME,
        database: process.env.DBNAME,
        password: process.env.DB_PASSWORD
    });
    connection.query(`select email from users  where email=${email}`, (error, result) => {
        if (error) console.log(error);
    })
}

module.exports = { createDbConnection };




