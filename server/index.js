const express = require('express');
const session = require('express-session');
const env = require('dotenv');
const http = require('http');
const { db, createDbConnection } = require('./models/dbConnection');



//routes 
const homeRoute = require('./routes/home');
const userRoute = require('./routes/user');
const doctorRoute = require('./routes/doctor');
const employeeRoute = require('./routes/employee');
const appointmentRoute = require('./routes/appointment');
const storeRoute = require('./routes/store');
const receiptRoute = require('./routes/receipt');
const complainRoute = require('./routes/complain');
const logoutRoute = require('./routes/logout');
const landingRoute = require('./routes/landing');
const inboxRoute = require('./routes/inbox');


const app = express();  //creating the express app instance. 
const server = http.createServer(app);//creating the http server 


//view engine
app.set('view engine ', 'ejs');

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
createDbConnection(db);




//routes
app.use('/',landingRoute);
app.use('/', userRoute);
app.use('/home',homeRoute);
app.use('/doctors', doctorRoute);
app.use('/employee', employeeRoute);
app.use('/appointment', appointmentRoute);
app.use('/store', storeRoute);
app.use('/complain', complainRoute);
app.use('/receipt', receiptRoute);
app.use('/logout',logoutRoute);
app.use('/inbox',inboxRoute);



server.listen(PORT, () => console.log(`server running on port ${PORT}`));





