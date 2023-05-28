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
    
    db.query(`select email from users where email = ${email}`,(error,result)=>{
        if(result[0]=== undefined){
            let query = `insert into users (username, email, password, email_status) values (${username},${email},${password},${status})`;
            console.log(query);
        }else if(error){
            console.log(error);
        }else {
            console.log({result});
        }
    })
}

const verify = (username, email, token ) => {
    let query = `insert into verify (username, email, token) values (${username},${email},${token})`
    console.log({query});
    db.query(query,(error,result)=> {
        if(error)console.log({error});
        else console.log({result});
    })
}

module.exports = { createDbConnection , signup,verify };




