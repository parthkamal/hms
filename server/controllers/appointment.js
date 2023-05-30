const { getAllAppointment,
    addAppointment,
    getAppointmentById, 
    editAppointmentById,
    deleteAppointmentById} = require("../models/appointment");



const getAppointmentController = (request, response) => {
    if (request.coookies['username'] == null) {
        response.redirect('/login');
    } else {
        next();
    }
}


const getAllAppointmentController = (request, response) => {
    getAllAppointment((error, result) => {
        if (error) console.log({ error });
        response.render('appointment.ejs', { list: result });
    })
}

const getAddAppointmentController = (request, response) => {
    response.render('appointment.ejs');
}


const postAddAppointmentController = (request, response) => {
    const {
        p_name,
        department,
        d_name,
        date,
        time,
        email,
        phone
    } = request.body;

    addAppointment(p_name, department, d_name, date, time, email, phone,
        (error, result) => {
            if (error) console.log({ error });
            response.redirect('/appointment');
        })


}


const getEditAppointmentController = (request, response) => {
    const { id } = request.params;
    getAppointmentById(id, (error, result) => {
        if (error) console.log({ error });
        response.render('edit_appointment.ejs', { list: result });
    })

}

const postEditAppointmentController = (request, response) => {

    const { id } = request.params;

    const {
        p_name,
        department,
        d_name,
        date,
        time,
        email,
        phone
    } = request.body;

    editAppointmentById(p_name,department,d_name,date,time,email,phone,id,(error,result) => {
        if(error) console.log({error});
        response.redirect('/appointment');
    })

}


const getDeleteAppointmentController = (request,response) => {
    const {id} = request.params;
    getAppointmentById(id,(error,result) => {
        if(error)console.log({error});
        response.render('delete_appointment.ejs',{list:result});
    })
}

const postDeleteAppointmentController = (request,response) => {
    const {id} = request.params;
    deleteAppointmentById(id,(error,result) => {
        if(error) console.log({error});
        response.redirect('/appointment');
    });
}













module.exports = {
    getAppointmentController,
    getAllAppointmentController,
    getAddAppointmentController,
    postAddAppointmentController,
    getEditAppointmentController,
    postEditAppointmentController,
    getDeleteAppointmentController,
    postDeleteAppointmentController,


};