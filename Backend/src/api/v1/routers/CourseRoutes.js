const Routers = require('express').Router();

//--------------------------- Middlewares Specific Stuff ---------------------------------X
const FetchUser = require('../middlewares/FetchUser'); //To identify the users login
const CheckRole = require('../middlewares/CheckRole'); //route only accessed by the admin
const SubscribeLecture = require('../middlewares/SubscribeLecture'); // route accessed only subscribed user
const UploadFile = require('../middlewares/UploadFile'); //To upload the files

//------------------ Controllers Specific Stuff-------------------------X
const CourseController = require('../controllers/CourseController');
 

//----------------------- INitizlalzing courses apis's routes here -------------------X
//Course CRUD
Routers.get('/fetchcourses', CourseController().fetchAll); //Fetch all the courses, using GET '/api/course/fetchcourses'
Routers.post('/addCourse', FetchUser, CheckRole, UploadFile, CourseController().addCourse); //Add a new course, using POST '/api/course/addCourse'
Routers.delete('/removeCourse/:id', FetchUser, CheckRole, CourseController().removeCourse); //delete a course, using DELETE '/api/course/removeCourse/id'

//Vidoes or lectures routes
Routers.get('/fetchLectures', CourseController().fetchLectures); //Fetch all the courses, using GET '/api/course/fetchLectures?course_id=""'
// Routers.get('/fetchLectures', FetchUser, SubscribeLecture, CourseController().fetchLectures); //Fetch all the courses, using GET '/api/course/fetchLectures?course_id=""'
Routers.get('/fetchLecture', FetchUser, SubscribeLecture, CourseController().fetchLecture); //Fetch all the courses, using GET '/api/course/fetchAll'
Routers.post('/addLecture/', FetchUser, CheckRole, UploadFile, CourseController().addLecture); //Add a new lecuture, using POST '/api/course/addLecture?course_id=""'
Routers.delete('/removeLecture', FetchUser, CheckRole, CourseController().removeLecture); //delete a lecture form the lectures, using DELETE '/api/course/removeCourse?course_id=''&lecture_id='''


module.exports = Routers;