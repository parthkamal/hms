const { getAllDepartment } = require('../models/department');
const { addDoctor,
    getDoctorById,
    editDoctor,
    getAllDoctor,
    searchDoctor,
    deleteDoctorById } = require('../models/doctor');

const doctorController = (request, response, next) => {
    if (request.cookies['username'] == null) {
        response.redirect('/login');
    } else {
        next();
    }
}


const showDoctorController = (request, response) => {
    getAllDoctor((error, result) => {
        if (error) throw error;
        response.render('doctors.ejs', { list: result });
    });
}

const getAddDoctorController = (request,response) => {

    getAllDepartment((error,result) => {
        if(error) console.log({error});
        response.render('add_doctor.ejs',{list:result});
    })
}

const addDoctorController = (request, response) => {
    const {
        first_name,
        last_name,
        email,
        dob,
        gender,
        address,
        phone,
        department,
        biography
    } = request.body;

    const { filename } = request.file;
    addDoctor(
        first_name, last_name, email, dob, gender, address, filename, phone, department, biography
        , (error, result) => {
            if (result) {
                const message = '1 doctor inserted successfully';
                console.log({ message });
                response.render('doctors .ejs',{list:result});
            }
            console.log({ error })
        });
}


const getEditDoctorController = (request, response) => {
    const { id } = request.params;
    getDoctorById(id, (error, result) => {
        if (error) console.log({ error });
        response.render('edit_doctor.ejs', { list: result });
    });
}

const postEditDoctorController = (request, response) => {
    const { id } = request.params;
    const {
        first_name,
        last_name,
        email,
        dob,
        gender,
        address,
        phone,
        department,
        biography
    } = request.body;


    editDoctor(first_name, last_name, email, dob, gender, address, phone, department, biography, id, (error, result) => {
        if (error) throw error;
        response.redirect('back');
    })
}

const getDeleteDoctorController = (request, response) => {
    const { id } = request.params;
    getDoctorById(id, (error, result) => {
        response.render('delete_doctor.ejs', { list: result });
    })
}

const postDeleteDoctorController = (request, response) => {
    const { id } = request.params;
    deleteDoctorById(id, (error, result) => {
        response.redirect('doctors');
    });
}



const searchDoctorController = (request, response) => {
    const { key } = request.body;
    searchDoctor(key, (error, result) => {
        console.log({ result });
        response.render('doctors.ejs', { list: result });
    })

}

module.exports = {
    doctorController,
    getAddDoctorController,
    addDoctorController,
    getEditDoctorController,
    postEditDoctorController,
    getDeleteDoctorController,
    postDeleteDoctorController,
    showDoctorController,
    searchDoctorController
};