const mysql = require('mysql2');
const express = require('express');
const router = express.Router();
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

const signup = (username, email, password, status) => {
    const query = `select email from users where email = ${"'" + email + "'"};`;

    db.query(query, (error, result) => {


        if (result[0] == undefined) {
            let query = `insert into users (username, email, password, email_status) values (${"'" + username + "'"},${"'" + email + "'"},${"'" + password + "'"},${"'" + status + "'"})`;

            db.query(query, (err, data) => {
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
    let query = `insert into verify (username, email, token) values (${"'" + username + "'"},${"'" + email + "'"},${"'" + token + "'"})`;
    console.log({ query });
    db.query(query, (error, result) => {
        if (result) console.log(result);
        else console.log(error);
    });
}

const getUserId = (email, callback) => {
    let query = `select * from verify where email = ${"'" + email + "'"}`;
    console.log('getuserid',query);
    db.query(query, callback);
}

module.exports = { createDbConnection, signup, verify, getUserId };




