//------------------------- Model Specific Stuff -----------------------X
const CourseModel = require("../models/CourseModel");
const StatsModel = require("../models/StatsModel");
const UserModel = require("../models/UserModel");

//--------------- Utiles Specific Stuff---------------
const getDataUri = require("../utils/DataUri"); //Use to send the data in buffer 

const cloudinary = require('cloudinary');

//------------------- Controlling the logic of the course specific -----------------X
function CourseController() {
    return {
        //-------------------------------- course crud stuff -------------------------X
        // Fetch all the coureses, using GET '/api/course/fetchAll'
        async fetchAll(req, res) {
            try {
                const {keyword,category} = req.query;

                const courses = await CourseModel.find({
                    title : { $regex : keyword, $option:'i'},
                    category : { $regex : category, $option:'i'},
                }).select('-lectures').sort({ createdAt: 'desc' });



                if (courses.length === 0) return res.status(200).json({ success: true, msg: 'At a time no course is available, please send request to add on' })

                return res.status(200).json({ success: true, msg: 'Fetch all the courses ', Length: courses.length, courses })

            } catch (error) { return res.status(500).json({ success: false, msg: error }) }
        },

        //Add a new course, using POST '/api/course/add'
        async addCourse(req, res) {
            try {
                const { title, description, category } = req.body;

                //Here the poster of the course
                if (!title || !description || !category) return res.status(401).json({ success: false, msg: 'All fields are required' })

                //1. Find the users by the id
                let user = await UserModel.findById(req.userId);
                if (!user)
                    return res.status(404).json({ success: false, msg: 'User not found' });

                //get the file
                const file = req.file;

                const fileUri = await getDataUri(file);

                //Cloudinary to send the data on server
                const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

                let course = await CourseModel.create({
                    title, description, category, created_by: user._id, poster: {
                        public_id: myCloud.public_id,
                        url: myCloud.secure_url
                    }
                })

                return res.status(200).json({ success: true, msg: 'Added a new course successfully', course });

            } catch (error) { return res.status(500).json({ success: false, msg: error }) }
        },

        //Remove a course, using DELETE '/api/course/removeCourse'
        async removeCourse(req, res) {
            try {
                const { id } = req.params;

                //Find the course by the id
                let course = await CourseModel.findOne({ _id: id });

                if (!course)
                    return res.status(404).json({ success: false, msg: 'Course not found' });

                //Delete all the posters and videos of this courses
                const mycloud = await cloudinary.v2.uploader.destroy(course.poster.public_id);

                course.lectures.forEach(async (item) => {
                    await cloudinary.v2.uploader.destroy(item.videos.public_id);
                })

                course = await CourseModel.deleteOne({ _id: id });

                // console.log('check course ', course);

                return res.status(200).json({ success: true, msg: 'Remove the course successfully' });

            } catch (error) { return res.status(500).json({ success: false, msg: error }) }
        },

        //Function to fetch the lectue if is admin or subscribe user, using GET '/api/course/fetchLectures'
        async fetchLectures(req,res){
            try {
                const lectures = await CourseModel.find().select('lectures');

                // lectures.views += 1;

                // await lectues.save();
                
                if(lectures.length === 0) return res.status(200).json({success:true,msg:'No lecture is here to show'})

                return res.status(200).json({success:true,msg:'Fetch all the lectures ',lectures})

            } catch (error) { return res.status(500).json({success:false,msg:error})   }
        },

        //Function to fetch the lectue if is admin or subscribe user, using GET '/api/course/fetchLectures'
        async fetchLecture(req,res){
            try {
                const lecture = await CourseModel.findOne({'lectures._id':req.params.id});

                log('check lecture ',lecture)

                lecture.views += 1;

                await lecture.save();
                
                // if(lecture.length === 0) return res.status(200).json({success:true,msg:'No lecture is here to show'});

                return res.status(200).json({success:true,msg:'Fetch all the lectures ',lecture})

            } catch (error) { return res.status(500).json({success:false,msg:error})   }
        },

        //Add a new lecture on the lectures, using POST '/api/course/addLecture'
        async addLecture(req, res) {
            try {
                const { title, description } = req.body;

                const { course_id } = req.query;

                //Here the poster of the course
                if (!title || !description) return res.status(401).json({ success: false, msg: 'All fields are required' })

                //1. Find the course and lectures by the id
                let course = await CourseModel.findById(course_id);

                if (!course) return res.status(404).json({ success: false, msg: 'Course not found' });

                //------------------ Uploading the file in cloudinary
                const file = req.file;

                const fileUri = await getDataUri(file);

                //Cloudinary to send the data on server
                const myCloud = await cloudinary.v2.uploader.upload(fileUri.content, { resource_type: 'video' });

                course.lectures.push({
                    title, description, videos: {
                        public_id: myCloud.public_id,
                        url: myCloud.secure_url
                    }
                })
                course.totalVideos = course.lectures.length;

                await course.save();

                return res.status(200).json({ success: true, msg: 'Added a new lecture successfully', lectures: course.lectures });

            } catch (error) { return res.status(500).json({ success: false, msg: error }) }
        },

        //Remove a course, using DELETE '/api/course/removeCourse'
        async removeLecture(req, res) {
            try {
                let { course_id, lecture_id } = req.query;

                //Find the course by the id
                let course = await CourseModel.findOne({ _id: course_id });

                if (!course)
                    return res.status(404).json({ success: false, msg: 'Course not found' });


                //Delete all the posters and videos of this courses
                let isFound = false;

                course.lectures.forEach(async (item) => {

                    if (item._id == String(lecture_id)) {
                        await cloudinary.v2.uploader.destroy(item.videos.public_id, { resource_type: 'video', });

                        isFound = true;
                    }
                });

                if (!isFound) return res.status(409).json({ success: false, msg: 'Lecture is not found ' });

                // lecture_id = lecture_id.toString();
                course = await CourseModel.updateOne({ _id: course_id }, {
                    $pull: {
                        'lectures': {
                            '_id': lecture_id
                        }
                    }
                })

                return res.status(200).json({ success: true, msg: 'Remove a lecture successfully' });

            } catch (error) { return res.status(500).json({ success: false, msg: error }) }
        },

    }
}

//----------------- Watch function in mongoDb, call whenever any changes is made in any of model
CourseModel.watch().on('change',async() =>{
    const stats = await StatsModel.find().sort({createdAt:'desc'}).limit(1) //show only last one

    // Now find users have active subscription
    const courses = await CourseModel.find()

    let totalViews = 0;


    for(let course of courses )
        totalViews += course.views;

    console.log('totalviews ',totalViews);

    stats[0].views = totalViews;

    await stats[0].save();
})

module.exports = CourseController;