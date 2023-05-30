const { getAllStore, addStore, getStoreById, editStoreById, deleteStoreById, searchStore } = require("../models/store");

const getStoreController = (request, response, next) => {
    if (request.cookies['username'] == null) {
        response.redirect('/login');
    } else {
        next();
    }
}

const getAllStoreController = (request, response) => {
    getAllStore((error, result) => {
        if (error) console.log({ error });
        response.render('store.ejs', { list: result });
    })
}

const getAddStoreController = (request, response) => {
    response, render('add_med.ejs');
}


const postAddStoreController = (request, response) => {
    const { name, p_date, expire, e_date, price, quantity } = request.body;
    addStore(name, p_date, expire, e_date, price, quantity, (error, result) => {
        if (error) console.log({ error });
        response.redirect('/store');
    })
}

const getEditStoreController = (request, response) => {
    const { id } = request.params;
    getStoreById(id, (error, result) => {
        if (error) console.log({ error });
        response.render('edit_med.ejs', { list: result });
    });
}


const postEditStoreController = (request, response) => {


    const { id } = request.params;
    const { name, p_date, expire, e_date, price, quantity } = request.body;


    editStoreById(name, p_date, expire, e_date, price, quantity, id, (error, result) => {
        if (error) console.log({ error });
        response.redirect('/store');
    })
}


const getDeleteStoreController = (request, response) => {
    const { id } = request.params;
    getStoreById(id, (error, result) => {
        if (error) console.log({ error });
        response.render('delete_med.ejs', { list: result });
    });
}

const postDeleteStoreController = (request, response) => {
    const { id } = request.params;
    deleteStoreById(id, (error, result) => {
        if (error) console.log({ error });
        response.redirect(result);
    })
}

const postSearchStoreController = (request, response) => {
    const { search: key } = request.body;
    searchStore(key, (error, result) => {
        if (error) console.log({ error });
        response.render('store.ejs', { list: result });
    })
}





module.exports =
{
    getStoreController,
    getAllStoreController,
    getAddStoreController,
    postAddStoreController,
    getEditStoreController,
    postEditStoreController,
    getDeleteStoreController,
    postDeleteStoreController,
    postSearchStoreController
};