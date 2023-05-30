
const { getAllEmployee,
    addEmployee,
    getEmployeeById,
    editEmployeeById,
    deleteEmployeeById,
    searchEmployee,
   } = require('../models/employee');

const employeeController = (request, response, next) => {
    if (request.cookies['username'] == null) {
        response.redirect('/login');
    } else {
        next();
    }
}

const getAllEmployeeController = (request, response) => {
    getAllEmployee((error, result) => {
        if (error) console.log({ error });
        response.render('employee.ejs', { employee: result });
    });
};


const getAddEmployeeController = (request, response) => {
    response.render('add_employee.ejs');
}

const postAddEmployeeController = (request, response) => {

    const {
        name,
        email,
        contact,
        date,
        role,
        salary
    } = request.body;

    addEmployee(name, email, contact, date, role, salary, (error, result) => {
        console.log('employee details are added to the database');
        if (error) console.log({ error });
        response.redirect('/employee');
    });
}



const getEditEmployeeController = (request, response) => {
    const { id } = request.params;
    getEmployeeById(id, (error, result) => {
        if (error) console.log({ error });
        response.render('edit_employee.ejs', { list: result });
    })
}


const postEditEmployeeController = (request, response) => {
    const {
        name,
        email,
        contact,
        join_date,
        role,
        salary,

    } = request.body;

    const { id } = request.params;

    editEmployeeById(name, email, contact, join_date, role, salary, id, (error, result) => {
        console.log('employee details edited');
        response.redirect('/employee');
    })
}




const getDeleteEmployeeController = (request, response) => {
    const { id } = request.params;
    getEmployeeById(id, (error, result) => {
        if (error) console.log({ error })
        response.render('delete_employee.ejs', { user: result });
    })
}

const postDeleteEmployeeController = (request, response) => {
    const { id } = request.params;
    deleteEmployeeById(id, (error, result) => {
        if (error) console.log({ error });
        response.redirect('/employee')
    })

}

const searchEmployeeController = (request, response) => {
    const key = request.body.search;
    searchEmployee(key, (error, result) => {
        if (error) console.log({ error });
        response.render('employee.ejs', { employee: result });

    });

}



















module.exports = {
    employeeController,
    getAllEmployeeController,
    getAddEmployeeController,
    postAddEmployeeController,
    getEditEmployeeController,
    postEditEmployeeController,
    getDeleteEmployeeController,
    postDeleteEmployeeController,
    searchEmployeeController
};