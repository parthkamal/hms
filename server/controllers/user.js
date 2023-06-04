const
    { signup,
        verify,
        temp,
        getTokenId,
        matchtoken,
        updateVerify,
        findOne
    } = require('../models/user');


const randomToken = require('random-token');
const nodemailer = require('nodemailer');
const sweetalert = require('sweetalert2');
const db = require('../models/dbConnection');
const flash = require('flash');





const signupController = (request, response) => {
    const { email, username, password } = request.body;
    const email_status = 'not_verified';
    signup(username, email, password, email_status);
    const token = randomToken(8);
    verify(username, email, token);
    getTokenId(email, (error, result) => {
        if (result) {
            console.log('result', result);
            let id = result[0].id;
            console.log('get user id', id);
            let output = `your verification id and token is given below: ${id}, ${token}`;

            const transporter = nodemailer.createTransport({
                host: process.env.ADMIN_SMTP_HOST,
                port: 587,
                auth: {
                    user: process.env.ADMIN_EMAIL,
                    pass: process.env.ADMIN_EMAIL_PASSWORD
                }
            });

            const options = {
                from: process.env.ADMIN_EMAIL,
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

        if (error) response.status(400).json({ error });

    });
}


const getLoginController = (request,response) => {
    response.render('login.ejs')
}

const loginController = (request, response) => {
    const { username, email, password } = request.body;
    db.query('select * from users where username = ? and password = ?', [username, password], (error, result) => {
        if (error) response.status(400).json({ error });
        if (result.length > 0) {
            request.session.loggedIn = true;
            request.session.username = username;
            response.cookie('username', username);
            let status = result[0].email_status;
            if (status == 'not_verified') {
                const message = 'please verify the email'
                response.status(400).json({ message });
            } else {
                sweetalert.fire('logged in');
                response.redirect('/home');
            }
        }

    })
}

const verifyController = (request, response) => {
    const { id, token } = request.body;
    matchtoken(id, token, (error, result) => {

        if (error) {
            console.log('error executing query', { error });
        }

        console.log(result);

        if (result.length > 0) {
            let email = result[0].email;
            let email_status = "verified";
            updateVerify(email, email_status, (error, result) => {
                if (error) response.status(400).json({ error });
                const message = "email is verified now. "
                response.status(200).json({ message });
            });
        }
        response.status(200).json({ result });
    })
}

const resetPasswordController = (request, response) => {
    const { email } = request.body;
    findOne(email, (error, result) => {
        if (!result) {
            const message = 'email does not exist';;
            response.status(400).json({ message });
        }

        if (error) {
            response.status(400).json({ error });
        }

        const { id, email } = result[0];
        const token = randomToken(8);

        temp(id, email, token, (error, result) => {
            let output = `your reset password verification id and token is given below: ${id}, ${token}`;

            const transporter = nodemailer.createTransport({
                host: process.env.ADMIN_SMTP_HOST,
                port: 587,
                auth: {
                    user: process.env.ADMIN_EMAIL,
                    pass: process.env.ADMIN_EMAIL_PASSWORD
                }
            });

            const options = {
                from: process.env.ADMIN_EMAIL,
                to: email,
                subject: 'email verification',
                html: output
            };


            transporter.sendMail(options, (error, info) => {
                if (error) return console.log({ error });
                console.log({ info });
            })

            const message = 'check your email to reset the password';
            response.status(200).json({ message });
        })
    })

}


module.exports = { signupController, 
    getLoginController,
    loginController,
     verifyController, 
     resetPasswordController }
