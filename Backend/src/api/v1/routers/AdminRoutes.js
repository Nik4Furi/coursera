const Routers = require('express').Router();


//--------------------------- Middlewares Specific Stuff ---------------------------------X
const FetchUser = require('../middlewares/FetchUser');
const CheckRole = require('../middlewares/CheckRole'); //only admin access

//------------------ Controllers Specific Stuff-------------------------X
const AdminController = require('../controllers/AdminController');

//----------------------- INitizlalzing auth apis's routes here -------------------X

Routers.get('/fetchAllUsers',FetchUser,CheckRole,AdminController().fetchAllUsers); //fetch all the users, using GET '/api/admin/fetchAllUsers'
Routers.put('/updateUserProfile/:id',FetchUser,CheckRole,AdminController().updateUserProfile); //Update the user profile like role etc, using PUT '/api/admin/updateUserProfile'
Routers.delete('/deleteUser/:id',FetchUser,CheckRole,AdminController().deleteUser); //Delete the user, using DELETE '/api/admin/deleteUser'

module.exports = Routers