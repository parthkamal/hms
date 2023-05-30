const express = require('express');

const { getAppointmentController,
    getAllAppointmentController,
    getAddAppointmentController,
    postAddAppointmentController,
    getEditAppointmentController,
    postEditAppointmentController,
    getDeleteAppointmentController,
    postDeleteAppointmentController
} = require('../controllers/appointment');

const router = express.Router();


router.get('*', getAppointmentController);
router.get('/', getAllAppointmentController);
router.get('/add_appointment', getAddAppointmentController);
router.post('/add_appointment', postAddAppointmentController);
router.get('/edit_appointment/:id',getEditAppointmentController);
router.post('/edit_appointment/:id',postEditAppointmentController);
router.get('/delete_appointment/:id',getDeleteAppointmentController);
router.post('/delete_appointment/:id',postDeleteAppointmentController);






module.exports = router; 
