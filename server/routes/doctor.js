const express = require('express');

const { doctorController,
    addDoctorController,
    getEditDoctorController,
    postEditDoctorController,
    getDeleteDoctorController,
    postDeleteDoctorController,
    searchDoctorController, 
    getAddDoctorController,
    showDoctorController} = require('../controllers/doctor');

const upload = require('../middlewares/upload');
const router = express.Router();


router.get('/*', doctorController);
router.get('/',showDoctorController);
router.get('/add_doctor',getAddDoctorController);
router.post('/add_doctor', upload.single('image'), addDoctorController);
router.get('/edit_doctor/:id', getEditDoctorController);
router.post('/edit_doctor/:id', postEditDoctorController);
router.get('/delete_doctor/:id', getDeleteDoctorController);
router.post('/delete_doctor/:id', postDeleteDoctorController);
router.post('/search', searchDoctorController);


module.exports = router; 