const { getEmployeeById } = require("../models/employee");
const { getAllReceipt } = require("../models/receipt");


const getReceiptController = (request, response, next) => {
    if (request.cookies['username'] == null) {
        response.redirect('/login');
    } else {
        next();
    }
}


const getAllReceiptController = (request, response) => {
    getAllReceipt((error, result) => {
        if (error) console.log({ error });
        response.render('salary.ejs', { employee: result });
    })
}

const getGenerateSlipController = (request, response) => {
    const { id } = request.params;
    getEmployeeById(id, (error, result) => {
        if (error) console.log({ error });

        const { name, id, email, role, salary, join_date, contact } = result[0];
        response.render('payslip.ejs',{name,id,email,role,salary,join_date,contact});

    })
}


module.exports = {
    getReceiptController,
    getAllReceiptController,
    getGenerateSlipController

}