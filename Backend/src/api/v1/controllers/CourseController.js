const CourseModel = require("../models/CourseModel");
// const { ResponseHandle } = require("../utils/ResponseHandle");

//------------------- Controlling the logic of the course specific -----------------X
function CourseController() {
    return {

        // Fetch all the coureses, using GET '/api/course/fetchAll'
        async FetchAll(req, res) {
            try {

                const courses = await CourseModal.find().select('-lectures');

                if (courses.length === 0) return res.status(200).json({ success: true, msg: 'At a time no course is available, please send request to add on' })

                return res.status(200).json({ success: true, msg: 'At a time no course is available, please send request to add on' })

            } catch (error) { return res.status(500).json({ success: false, msg: error.message }) }
        },

        //Add a new course, using POST '/api/course/add'
        async addCourse(req, res) {
            try {
                const { title, description } = req.body;

                //1. Find the users by the id
                let user = await UserModel.findById(req.userId);
                if (!user)
                    return res.status(404).json({ success: false, msg: 'User not found' });

                let courses = await CourseModel.create({
                    title, description, created_by: user._id,
                })

                return res.status(200).json({ success: true, msg: 'Added a new course successfully', courses });


            } catch (error) {

            }
        }

    }
}

module.exports = CourseController;