const Routers = require('express').Router();

//---------------- Controller Specific Stuff;
const OtherController = require('../controllers/OtherController');

//-------------- Define to set our all routers, used in other works
Routers.post('/contact', OtherController().ContactUs); //Contact us, send details on admin mail, using POST '/contact'

module.exports = Routers;