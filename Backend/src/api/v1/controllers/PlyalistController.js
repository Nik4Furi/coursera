//------------------------- Model Specific Stuff -----------------------X
const CourseModel = require("../models/CourseModel");
const UserModel = require("../models/UserModel");

//------------------- Controlling the logic of the course specific -----------------X
function PlaylistController() {
    return {

        // Fetch all the playlist course, using GET '/api/plyalist/fetchPlaylist'
        async fetchPlaylist(req, res) {
            try {
                if (req.user.playlist.length === 0) return res.status(200).json({ success: true, msg: 'No course is available in your playlist' })

                const courses = [];

                for (let i = 0; i < req.user.playlist.length; i++) {
                    let id = req.user.playlist[i];
                    let course = await CourseModel.findOne({ _id: id });

                    if (course)
                        courses.push(course);
                }

                return res.status(200).json({ success: true, msg: 'Fetch the playlist videos of the user', courses })

            } catch (error) { return res.status(500).json({ success: false, msg: error }) }
        },

        //Add a new course in playlist, using POST '/api/playlist/addToPlaylist/:id'
        async addToPlaylist(req, res) {

            try {

                //First find the lectures is exist
                const { id } = req.params;
                const findCourse = await CourseModel.findOne({ _id: id });

                if (!findCourse) return res.status(404).json({ success: false, msg: 'Course is not found' });

                //Other wise add this lecture in playlist
                await req.user.updateOne({ $addToSet: { 'playlist': id } });

                await req.user.save();

                return res.status(200).json({ success: true, msg: 'Added a new course in your playlist' });

            } catch (error) { return res.status(500).json({ success: false, msg: error }) }
        },

        //Remove a course from playlist, using DELETE '/api/playlist/removeToPlaylist/:id'
        async removeToPlaylist(req, res) {
            try {
                const { id } = req.params;

                await UserModel.updateOne({ _id: req.user._id }, {
                    $pull: {
                        'playlist': id
                    }
                });

                return res.status(200).json({ success: true, msg: 'Remove the lecture from playlist' });

            } catch (error) { return res.status(500).json({ success: false, msg: error }) }
        }

    }
}

module.exports = PlaylistController;