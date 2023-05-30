const express = require('express');
const router = express.Router();

const { employeeController,
    getAllEmployeeController,
    getAddEmployeeController,
    postAddEmployeeController, 
    getEditEmployeeController,
    postEditEmployeeController,
    getDeleteEmployeeController,
    postDeleteEmployeeController,
    searchEmployeeController} = require('../controllers/employee');


const { 
    getEmployeeOnLeaveController,
    getEmployeeAddLeaveController,
    getEditLeaveEmployeeController,
    postEditLeaveEmployeeController,
    getDeleteLeaveEmployeeController,
    postDeleteLeaveEmployeeController,
    postEmployeeAddLeaveController,
} = require('../controllers/leave')



 const { verifyLeave, verifyLeaveMiddleware } = require('../validators/employee');

router.get('*', employeeController);
router.get('/', getAllEmployeeController);
router.get('/add', getAddEmployeeController);
router.post('/add', postAddEmployeeController);
router.get('/edit_employee/:id',getEditEmployeeController);
router.post('/edit_employee/:id',postEditEmployeeController);
router.get('/delete_employee/:id',getDeleteEmployeeController);
router.post('/delete_employee/:id',postDeleteEmployeeController);
router.post('/search',searchEmployeeController);

router.get('/leave',getEmployeeOnLeaveController);
router.get('/add_leave',getEmployeeAddLeaveController);
router.post('/add_leave',verifyLeave,verifyLeaveMiddleware,postEmployeeAddLeaveController);
router.get('/edit_leave/:id',getEditLeaveEmployeeController);
router.post('/edit_leave/:id',postEditLeaveEmployeeController);
router.get('/delete_leave/:id',getDeleteLeaveEmployeeController);
router.post('/delete_leave/:id',postDeleteLeaveEmployeeController);





module.exports = router;
