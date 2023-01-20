const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

const SchemaValidator = require('../middlewares/schema_validator');
const validateRequest = SchemaValidator(true);

const auth = require('../middlewares/auth');

route.use(auth);



const categoryService = require('../service/Category_service');
const driverService = require('../service/Driver_service');
const productService = require('../service/Product_service');
const workerService = require('../service/Worker_service');
const userService = require('../service/User_service');

//Users

route.get('/users/:page', userService.getPage);
route.post('/users/edit/:id', userService.edit);
route.delete('/users/:id', userService.remove);

//category

route.get('/categories/:page', categoryService.getPage);
route.post('/categories' , categoryService.createNew);
route.put('/categories/:id' , categoryService.edit);
route.delete('/categories/:id', categoryService.remove);
route.get('/categoriesPageNumber/', categoryService.getPageNumber);
route.get('/categoriesNames', categoryService.getNames);

// Drivers

route.get('/drivers/:page', driverService.getPage);
route.post('/drivers', validateRequest , driverService.createNew);
route.put('/drivers/:id', validateRequest , driverService.edit);
route.delete('/drivers/:id', driverService.remove);

//Product

route.get('/products/:page', productService.getPage);
route.post('/products' , productService.createNew);
route.put('/productss/:id', validateRequest , productService.edit);
route.delete('/products/:id', productService.remove);
route.get('/products/category/:id', productService.getPageCategory)

//Workers

route.get('/workers/:page', workerService.getPage);
route.post('/workers', validateRequest , workerService.createNew);
route.put('/workers/:id', validateRequest , workerService.edit);
route.delete('/workers/:id', workerService.remove);







module.exports = route;