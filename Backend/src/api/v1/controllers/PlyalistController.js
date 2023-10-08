//------------------------- Model Specific Stuff -----------------------X
const CourseModal = require("../models/CourseModel");
const UserModel = require("../models/UserModel");

//------------------- Controlling the logic of the course specific -----------------X
function PlaylistController() {
    return {
        // Fetch all the coureses, using GET '/api/course/fetchAll'
        async fetchPlaylist(req, res) {
            try {
                if (req.user.playlist.length === 0) return res.status(200).json({ success: true, msg: 'At a time no lecture is available in your playlist' })

                return res.status(200).json({ success: true, msg: 'Fetch the playlist videos of the user', playlist: req.user.playlist })

            } catch (error) { return res.status(500).json({ success: false, msg: error }) }
        },

        //Add a new course, using POST '/api/course/add'
        async addToPlaylist(req, res) {
            try {

                //First find the lectures is exist
                const { id } = req.params;
                const findLecture = await CourseModal.findOne({ 'lectures._id': id });
                // const findLecture = await CourseModal.find({lectures : {'_id':req.params.id}})

                if (!findLecture) return res.status(404).json({ success: false, msg: 'Lecture is not found' });

                //Other wise add this lecture in playlist
                req.user.playlist.push(id);

                await req.user.save();

                return res.status(200).json({ success: true, msg: 'Added a new lecture in your playlist' });

            } catch (error) { return res.status(500).json({ success: false, msg: error }) }
        },

        //Remove a course, using DELETE '/api/course/removeCourse'
        async removeToPlaylist(req, res) {
            try {
                const { id } = req.params;

                const removeToPlaylist = await UserModel.updateOne({ _id: req.user._id }, {
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