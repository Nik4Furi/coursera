//------------------------- Model Specific Stuff -----------------------X
const CourseModel = require("../models/CourseModel");
const StatsModel = require("../models/StatsModel");

//--------------- Utiles Specific Stuff---------------
const getDataUri = require("../utils/DataUri"); //Use to send the data in buffer 

//-------------------- Packages Specific Stuff
const cloudinary = require('cloudinary'); //used to upload the files on cloud

//------------------- Controlling the logic of the course specific -----------------X
function CourseController() {

    return {
        //-------------------------------- course crud stuff -------------------------X
        // Fetch all the coureses, using GET '/api/course/fetchcourses'
        async fetchAll(req, res) {
            try {
                const courses = await CourseModel.find().select('-lectures').sort({ createdAt: 'desc' });

                if (courses.length === 0) return res.status(200).json({ success: true, msg: 'No course is available' })

                return res.status(200).json({ success: true, msg: 'Fetch all the courses ', Length: courses.length, courses })

            } catch (error) { return res.status(500).json({ success: false, msg: error }) }
        },

        //Add a new course, using POST '/api/course/addCourse'
        async addCourse(req, res) {
            try {
                const { title, description, category } = req.body;

                //Here the poster of the course
                if (!title || !description || !category) return res.status(401).json({ success: false, msg: 'All fields are required' })

                //get the file
                const file = req.file;

                const fileUri = await getDataUri(file);

                //Cloudinary to send the data on server
                const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);


                let course = await CourseModel.create({
                    title, description, category, created_by: req.user._id, poster: {
                        public_id: myCloud.public_id,
                        url: myCloud.secure_url
                    }
                });


                return res.status(200).json({ success: true, msg: 'Added a new course successfully', course });

            } catch (error) { return res.status(500).json({ success: false, msg: error }) }
        },

        //Remove a course, using DELETE '/api/course//removeCourse/:id'
        async removeCourse(req, res) {
            try {
                const { id } = req.params;

                //Find the course by the id
                let course = await CourseModel.findOne({ _id: id });

                if (!course)
                    return res.status(404).json({ success: false, msg: 'Course not found' });


                //Delete all the posters and videos of this courses
                await cloudinary.v2.uploader.destroy(course.poster.public_id);

                course.lectures.forEach(async (item) => {
                    await cloudinary.v2.uploader.destroy(item.videos.public_id, { resource_type: 'video', });
                })

                await CourseModel.deleteOne({ _id: id });

                return res.status(200).json({ success: true, msg: 'Remove the course successfully' });

            } catch (error) { return res.status(500).json({ success: false, msg: error }) }
        },

        //Function to fetch the lectue if is admin or subscribe user, using GET '/api/course/fetchLectures?course_id=""'
        async fetchLectures(req, res) {
            try {
                const lectures = await CourseModel.findOne({ _id: req.query.course_id }).select('lectures');

                if (lectures.lectures.length === 0) return res.status(200).json({ success: true, msg: 'No lecture is available in this course' })

                if (lectures.lectures.length > 0) {

                    for (let lecture of lectures.lectures)
                        lecture.views += 1;


                    await lectures.save();
                }

                return res.status(200).json({ success: true, msg: 'Fetch all the lectures ', lectures: lectures.lectures })

            } catch (error) { return res.status(500).json({ success: false, msg: error }) }
        },

        //Function to fetch the lectue if is admin or subscribe user, using GET '/api/course/fetchLecture?course_id=""&lecture_id=""'
        async fetchLecture(req, res) {
            try {
                const { course_id, lecture_id } = req.query;

                const lecture = await CourseModel.findOne({ _id: course_id, "lectures._id": lecture_id });

                if (!lecture) return res.status(404).json({ success: false, msg: "Lecture Not Found " });

                lecture.views += 1;

                await lecture.save();

                return res.status(200).json({ success: true, msg: 'Fetch all the lectures ', lecture })

            } catch (error) { return res.status(500).json({ success: false, msg: error }) }
        },

        //Add a new lecture on the lectures, using POST '/api/course/addLecture?course_id=""'
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
                const lectureLen = course.lectures.length;
                course.totalVideos = lectureLen;

                await course.save();

                return res.status(200).json({ success: true, msg: 'Added a new lecture successfully', lecture: course.lectures[lectureLen - 1] });

            } catch (error) { return res.status(500).json({ success: false, msg: error }) }
        },

        //Remove a course, using DELETE '/api/course/removeLecture?course_id=""&lecture_id=""'
        async removeLecture(req, res) {
            try {
                const { course_id, lecture_id } = req.query;

                const course = await CourseModel.findOne({ _id: course_id });

                if (!course)
                    return res.status(404).json({ success: false, msg: 'Course not found' });


                //Delete all the posters and videos of this courses
                if (course.lectures.length > 0) {

                    course.lectures.forEach(async (item) => {

                        if (item._id == String(lecture_id)) {
                            await cloudinary.v2.uploader.destroy(item.videos.public_id, { resource_type: 'video', });
                        }
                    });
                }

                // lecture_id = lecture_id.toString();
                await CourseModel.updateOne({ _id: course_id }, {
                    $pull: {
                        'lectures': {
                            '_id': lecture_id
                        }
                    }
                });

                course.totalVideos -= 1;

                await course.save();

                return res.status(200).json({ success: true, msg: 'Remove a lecture successfully' });

            } catch (error) { return res.status(500).json({ success: false, msg: error }) }
        },

    }
}

//----------------- Watch function in mongoDb, call whenever any changes is made in any of model
CourseModel.watch().on('change', async () => {

    try {

        const stats = await StatsModel.find().sort({ createdAt: 'desc' }).limit(1) //show only last one

        // Now find users have active subscription
        const courses = await CourseModel.find();

        let totalViews = 0;

        for (let course of courses) {
            if (course.lectures.length > 0) {
                for (let lectures of course.lectures)
                    totalViews += Number(lectures.views);
            }
        }

        stats[0].views = Number(totalViews);
        stats[0].createdAt = new Date(Date.now());

        await stats[0].save();

    } catch (error) {
        // console.log(error, 'state error at courses');
    }
})

module.exports = CourseController;