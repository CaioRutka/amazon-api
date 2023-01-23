const express = require('express')
const multer = require('multer');
const routes = new express.Router();
const upload = multer();

/* IMPORT DOS CONTROLLERS */
const UserController = require('./controllers/UserController');

// USER REST CALL's
routes.get('/user/getuserinfo/:id',upload.single(), UserController.getUserInfo);
routes.get('/user', UserController.index);
routes.post('/user/login', upload.single(), UserController.login);
routes.post('/user', upload.single(), UserController.store);
routes.post('/user/newhash', upload.single(), UserController.addNewHash);

module.exports = routes;
