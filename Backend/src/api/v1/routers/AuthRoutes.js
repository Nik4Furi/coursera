const Routers = require('express').Router();


//--------------------------- Middlewares Specific Stuff ---------------------------------X
const FetchUser = require('../middlewares/FetchUser');

//------------------ Controllers Specific Stuff-------------------------X
const AuthController = require('../controllers/AuthController');
const CourseController = require('../controllers/CourseController');


//----------------------- INitizlalzing auth apis's routes here -------------------X
Routers.post('/register',AuthController().Register); //Register the users ,using POST '/api/user/register'
Routers.post('/login',AuthController().Login); //login the users ,using POST '/api/user/login'
Routers.get('/getUser',FetchUser,AuthController().getUser); //get info of login users ,using GET '/api/user/getUser'

Routers.put('/changePassword',FetchUser,AuthController().changePassword); //Change the password in basis of old password is correct, using PUT '/api/changePassword'
Routers.put('/updateProfile',FetchUser,AuthController().updateProfile); //Update the user profile like name,email,dp etc, using PUT '/api/updateProfile'

//Auth controllers routes is connect in between
Routers.post('/forgetPassword',AuthController().forgetPassword); //To forget the password send the mail of register emails, using POST '/api/forgetPassword'
Routers.post('/resetPassword/:token',AuthController().resetPassword); //Through the mail, check reset password token and reset the password of the user, using POST '/api/resetPassword/token'



module.exports = Routers