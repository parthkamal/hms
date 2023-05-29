const express = require('express');
const path = require('path'); //core module
const session = require('express-session');
const env = require('dotenv');
const ejs = require('ejs');
const multer = require('multer');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const validator = require('express-validator');
const async = require('async');
const sweetalert2 = require('sweetalert2');
const http = require('http');//core module
const db = require('./controllers/dbController');


//routes 
const userRoute = require('./routes/user');


const app = express();  //creating the express app instance. 
const server = http.createServer(app);//creating the http server 


//middlwares 
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: true, 
    saveUninitialized: true
}))


//enviroment variables 
env.config();


const sessionOptions = {
    genid: (request) => genuuid,
    secret: 'session-secret'
}

// app.use(session({genid:(req)=> genuuid}));
const PORT = process.env.PORT;

//establishing the database connection 
db.createDbConnection();




//routes
app.use('/',userRoute);



server.listen(PORT, () => console.log(`server running on port ${PORT}`));





