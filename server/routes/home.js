const express = require("express");

const { departmentController,
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

} = require("../controllers/home");

const router = express.Router();

router.get('*', departmentController);
router.get('/', getHomeController);
router.get('/departments', getDepartmentController);
router.get('/add_departments', getAddDepartmentController);
router.post('/add_departments', postAddDepartmentController);
router.get('/delete_department/:id',getDeleteDepartmentController);
router.post('/delete_department/:id',postDeleteDepartmentController);
router.get('/edit_department/:id',getEditDepartmentController);
router.post('/edit_department/:id',postEditDepartmentController);
router.get('/profile',getProfileController);
router.post('/profile',postProfileController);









module.exports = router; 