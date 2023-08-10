//------------------------- Model Specific Stuff -----------------------X
const UserModel = require("../models/UserModel");

//------------------- Controlling the logic of the course specific -----------------X
function PlaylistController() {
    return {
        // Fetch all the coureses, using GET '/api/course/fetchAll'
        async fetchPlaylist(req, res) {
            try {

                //1. Find the users by the id
                const user = await UserModel.findById(req.userId);
                if (!user)
                    return res.status(404).json({ success: false, msg: 'User not found' });
                console.log(user);


                
                // if (courses.length === 0) return res.status(200).json({ success: true, msg: 'At a time no course is available, please send request to add on' })

                return res.status(200).json({ success: true, msg: 'Fetch the playlist videos of the user' })

            } catch (error) { return res.status(500).json({ success: false, msg: error.message }) }
        },

        //Add a new course, using POST '/api/course/add'
        async addToPlaylist(req, res) {
            try {
                const { title, description,category } = req.body;

                //Here the poster of the course
                if(!title || !description || !category) return res.status(401).json({success:false,msg:'All fields are required'})

                //1. Find the users by the id
                const user = await UserModel.findById(req.userId);
                if (!user)
                    return res.status(404).json({ success: false, msg: 'User not found' });

                let course = await CourseModel.create({
                    title, description,category, created_by: user._id,
                })

                return res.status(200).json({ success: true, msg: 'Added a new course successfully', course });

            } catch (error) { return res.status(500).json({ success: false, msg: error.message }) }
        },

        //Remove a course, using DELETE '/api/course/removeCourse'
        async removeToPlaylist(req, res) {
            try {
                const {id} = req.params;

                //1. Find the users by the id
                let user = await UserModel.findById(req.userId);

                if (!user)
                    return res.status(404).json({ success: false, msg: 'User not found' });

                //Find the course by the id
                let course = await CourseModel.deleteOne({_id:id});

                if (!course)
                    return res.status(404).json({ success: false, msg: 'Course not found' });

                //Delet its lectures poster and video also delete poster of course
                console.log(course);

                const courses = await CourseModel.find();

                return res.status(200).json({ success: true, msg: 'Remove the course successfully', length:courses.length});

            } catch (error) { return res.status(500).json({ success: false, msg: error.message }) }
        }

    }
}

module.exports = PlaylistController;