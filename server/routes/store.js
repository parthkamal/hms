const express = require('express');

const {getStoreController,
     getAllStoreController,
     getAddStoreController,
     postAddStoreController,
     getEditStoreController,
     postEditStoreController,
     getDeleteStoreController,
     postDeleteStoreController,
     postSearchStoreController} = require('../controllers/store');

const router = express.Router();


router.get('*',getStoreController);
router.get('/',getAllStoreController);
router.get('/add_med',getAddStoreController);
router.post('/add_med',postAddStoreController);
router.get('/edit_med/:id',getEditStoreController);
router.post('/edit_med/:id',postEditStoreController);
router.get('/delete_med/:id',getDeleteStoreController);
router.post('/delete_med/:id',postDeleteStoreController);
router.post('/search',postSearchStoreController);



module.exports = router; 
