const express = require('express');
const session = require('express-session');
const env = require('dotenv');
const {db, createDbConnection} = require('./controllers/dbController');



//routes 
const userRoute = require('./routes/user');
const doctorRoute = require('./routes/doctor');
const employeeRoute = require('./routes/employee');
const appointmentRoute = require('./routes/appointment');
const storeRoute = require('./routes/store');
const receiptRoute = require('./routes/receipt');
const complainRoute = require('./routes/complain');


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
createDbConnection(db);




//routes
app.use('/',userRoute);
app.use('/doctor',doctorRoute);
app.use('/employee', employeeRoute);
app.use('/appointment',appointmentRoute);
app.use('/store', storeRoute);
app.use('/complain',complainRoute);
app.use('/receipt',receiptRoute);



server.listen(PORT, () => console.log(`server running on port ${PORT}`));





