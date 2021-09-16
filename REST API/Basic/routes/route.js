const express = require('express');
const controller = require('../controllers/RestApiController');

const Router = express.Router();

Router.get('/getdata', controller.getdata);

Router.post('/postreq', controller.postreq);
module.exports = Router;
