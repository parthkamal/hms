const mysql = require('mysql2');
const express = require('express');
const router = express.Router();
const db = require('./dbConnection');
const { errorMonitor } = require('nodemailer/lib/xoauth2');

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

module.exports = { createDbConnection, signup, verify, getTokenId, matchtoken, updateVerify };




