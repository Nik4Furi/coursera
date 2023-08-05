const AuthController = require('../controllers/AuthController');
const CourseController = require('../controllers/CourseController');
const FetchUser = require('../middlewares/FetchUser');

const Routers = require('express').Router();

//------------------------  Initialzing your controllers here -------------X



//----------------------- INitizlalzing your apis's routes here --------------------X
Routers.post('/user/register',AuthController().Register); //Register the users ,using POST '/api/user/register'
Routers.post('/user/login',AuthController().Login); //login the users ,using POST '/api/user/login'
Routers.get('/user/getUser',FetchUser,AuthController().getUser); //get info of login users ,using GET '/api/user/getUser'

Routers.put('/user/changePassword',FetchUser,AuthController().getUser); //Change the password in basis of old password is correct, using PUT '/api/user/changePassword'
Routers.put('/user/updateProfile',FetchUser,AuthController().getUser); //Update the user profile like name,email,dp etc, using PUT '/api/user/updateProfile'

//Auth controllers routes is connect in between
Routers.post('/user/forgetPassword',AuthController().forgetPassword); //To forget the password send the mail of register emails, using POST '/api/user/forgetPassword'
Routers.post('/user/resetPassword/:token',AuthController().resetPassword); //Through the mail, check reset password token and reset the password of the user, using POST '/api/user/resetPassword/token'

//----------------------- Courses APIs Stuff
Routers.get('/course/fetchAll',CourseController().FetchAll); //Fetch all the courses ,using GET '/api/course/fetchAll'

module.exports = Routers