const AuthController = require('../controllers/AuthController');
const CourseController = require('../controllers/CourseController');
const FetchUser = require('../middlewares/FetchUser');

const Routers = require('express').Router();

//------------------------  Initialzing your controllers here -------------X



//----------------------- INitizlalzing your apis's routes here --------------------X
Routers.post('/user/register',AuthController().Register); //Register the users ,using POST '/api/user/register'
Routers.post('/user/login',AuthController().Login); //login the users ,using POST '/api/user/login'
Routers.get('/user/getUser',FetchUser,AuthController().getUser); //get info of login users ,using GET '/api/user/getUser'

//----------------------- Courses APIs Stuff
Routers.get('/course/fetchAll',CourseController().FetchAll); //Fetch all the courses ,using GET '/api/course/fetchAll'

module.exports = Routers