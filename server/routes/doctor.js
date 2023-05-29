const express = require('express');

const { doctorController,
    showDoctorController,
    addDoctorController,
    getEditDoctorController,
    postEditDoctorController,
    getDeleteDoctorController,
    postDeleteDoctorController,
    searchDoctorController } = require('../controllers/doctor');

const upload = require('../middlewares/upload');
const router = express.Router();


router.get('/*', doctorController);
router.post('/add_doctor', upload.single('image'), addDoctorController);
router.get('/edit_doctor/:id', getEditDoctorController);
router.post('/edit_doctor/:id', postEditDoctorController);
router.get('/delete_doctor/:id', getDeleteDoctorController);
router.post('/delete_doctor/:id', postDeleteDoctorController);
router.get('/', showDoctorController);
router.post('/search', searchDoctorController);


module.exports = router; 