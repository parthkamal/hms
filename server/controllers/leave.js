
const { 
    getAllLeave,
    getLeaveById,
    editLeaveById,
    deleteLeaveById,
    addLeave 
} = require('../models/leave');


const getEmployeeOnLeaveController = (request, response) => {
    getAllLeave((error, result) => {
        if (error) console.log({ error });
        response.render('leave.ejs', { user: result });
    })
}

const getEmployeeAddLeaveController = (request, response) => {
    response.render('add_leave.ejs');
}

const postEmployeeAddLeaveController = (request, response) => {

    const { id, name, leave_type, from, to, reason } = request.body;
    addLeave(id, name, leave_type, from, to, reason, (error, result) => {
        if (error) console.log({ error });
        response.redirect('/employee/leave');
    })
}


const getEditLeaveEmployeeController = (request, response) => {
    const { id } = request.params;
    getLeaveById(id, (error, result) => {
        if (error) console.log({ error });
        response.render('edit_leave.ejs', { user: result })
    })
}


const postEditLeaveEmployeeController = (request, response) => {
    const { id } = request.params;

    const {
        name,
        leave_type,
        from,
        to,
        reason
    } = request.body;

    editLeaveById(id, name,leave_type, from, to, reason, (error, result) => {
        if (error) console.log({ error });
        if(result) console.log({message : 'edit leave successfully'});
        response.redirect('/employee/leave');
    })
}

const getDeleteLeaveEmployeeController = (request, response) => {
    const { id } = request.params;
    getLeaveById(id, (error, result) => {
        if (error) console.log({ error })
        response.render('delete_leave.ejs', { user: result });
    })
}

const postDeleteLeaveEmployeeController = (request, response) => {
    const { id } = request.params;
    deleteLeaveById(id, (error, result) => {
        if (error) console.log({ error });
        response.redirect('/employee/leave');
    })

}





















module.exports = {
    
    getEmployeeOnLeaveController,
    getEmployeeAddLeaveController,
    postEmployeeAddLeaveController,
    getEditLeaveEmployeeController,
    postEditLeaveEmployeeController,
    getDeleteLeaveEmployeeController,
    postDeleteLeaveEmployeeController,
   
};