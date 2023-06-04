const { getAllDoctor } = require('../models/doctor');
const { getAllAppointment } = require('../models/appointment');
const { getAllDepartment, addDepartment, getDepartmentById, deleteDepartmentById, editDepartment } = require('../models/department');
const { getUserByUsername, updateUser } = require('../models/user');



const departmentController = (request, response, next) => {
    console.log('home/')
    console.log(request.session);
    console.log(request.cookies);
    console.log(response.cookies);
    console.log('home/')

    if (request.cookies['username'] == null) {
        response.redirect('/login');
    } else {
        next();
    }
}


const getHomeController = (request, response) => {
    getAllDoctor(function (err, result) {
        getAllAppointment(function (err, result1) {
            var total_doc = result.length;
            var appointment = result1.length;

            response.render('home.ejs', { doc: total_doc, doclist: result, appointment: appointment, applist: result1 });
        });
        //console.log(result.length);

    });

}


const getDepartmentController = (request, response) => {
    getAllDepartment((error, result) => {
        if (error) console.log({ error });
        response.render('departments.ejs', { list: result });
    })
}


const getAddDepartmentController = (request, response) => {
    response.render('add_departments.ejs');
}


const postAddDepartmentController = (request, response) => {
    const { dpt_name: name, desc } = request.body;
    addDepartment(name, desc, (error, result) => {
        if (error) console.log({ error });
        response.redirect('/home/departments');
    })
}

const getDeleteDepartmentController = (request, response) => {

    const { id } = request.params;

    getDepartmentById(id, (error, result) => {
        if (error) console.log({ error });
        response.render('delete_department.ejs', { list: result });
    });
}

const postDeleteDepartmentController = (request, response) => {
    const { id } = request.params;

    deleteDepartmentById(id, (error, result) => {
        if (error) console.log({ error });
        response.redirect('/home/departments');
    });
}

const getEditDepartmentController = (request, response) => {
    const { id } = request.params;

    getDepartmentById(id, (error, result) => {
        if (error) console.log({ error });
        response.render('edit_department.ejs', { list: result });
    })
}


const postEditDepartmentController = (request, response) => {

    const { id } = request.params;
    const { dpt_name: name, desc } = request.body;

    editDepartment(id, name, desc, (error, result) => {
        if (error) console.log({ error });
        response.redirect('/home/departments');
    });
}

const getProfileController = (request, response) => {
    var username = request.cookies['username'];
    getUserByUsername(username, (error, result) => {
        if (error) console.log({ error });
        response.render('profile.ejs', { list: result });
    });
}

const postProfileController = (request, response) => {
    var username = request.cookies['username'];
    getUserByUsername(username, (error, result) => {
        if (error) console.log({ error });
        const { id, password } = result[0];

        const { username: new_username, email: new_email, new_password, password: old_password } = request.body;
        if (password == old_password) {

            updateUser(id, new_username, new_email, new_password, (error, result) => {
                if (error) { response.send("old password did not match"); }
                else {
                    response.send("profile edited successfully");
                }
            })
        }



    });
}

module.exports = {
    departmentController,
    getHomeController,
    getDepartmentController,
    getAddDepartmentController,
    postAddDepartmentController,
    getDeleteDepartmentController,
    postDeleteDepartmentController,
    getEditDepartmentController,
    postEditDepartmentController,
    getProfileController,
    postProfileController
};