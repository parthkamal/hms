const express = require('express');
const { signup, verify, getUserId } = require('../controllers/dbController');
const randomToken = require('random-token');
const nodemailer = require('nodemailer');
const session = require('express-session');
const sweetalert  = require('sweetalert2');
const db = require('./dbConnection');


const signupController = (request, response) => {
    const { email, username, password } = request.body;
    const email_status = 'not_verified';
    signup(username, email, password, email_status);
    const token = randomToken(8);
    verify(username, email, token);
    getUserId(email, (error, result) => {
        if (result) {
            console.log('result', result);
            let id = result[0].id;
            console.log('get user id', id);
            let output = `your verification id and token is given below: ${id}, ${token}`;

            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'alfredo.fadel@ethereal.email',
                    pass: '2xV9M5XqsMdVck7gRA'
                }
            });

            const options = {
                from: 'alfredo.fadel@ethereal.email',
                to: email,
                subject: 'email verification',
                html: output
            };

            transporter.sendMail(options, (error, info) => {
                if (error) return console.log({ error });
                console.log({ info });
            })

            const message = 'check your email to verify';
            response.status(200).json({ message });
        }

        response.status(400).json({error});

    });
}

const loginController =(request, response )=> {
    const {username, email, password} = request.body; 
    db.query('select * from users where username = ? and password = ?',[username, password], (error, result)=> {
        if(error)response.status(400).json({error});
        if(result.length>0){ 
            request.session.loggedIn = true; 
            request.session.username = username;
            response.cookie('username',username);
            let status = result[0].email_status;
            if(status == 'not_verified'){
                const message = 'please verify the email'
                response.status(400).json({message});
            }else {
                sweetalert.fire('logged in');
                response.redirect('/home');
            }
        }
        
    })
}


module.exports = {signupController, loginController}