const UserModel = require("../models/UserModel");

const cloudinary = require('cloudinary')

//------------- Controller for controlling admin actions -------------------------X
function AdminController() {
    return {

        //Function to fetch all the users
        async fetchAllUsers(req, res) {
            try {
                const users = await UserModel.find();
                if (users.length == 0) return res.status(200).json({ success: true, msg: 'No user yet' });

                return res.status(200).json({ success: true, msg: 'Fetch all the users', length: users.length, users })

            } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }
        },


        //Update the users profiles
        async updateUserProfile(req, res) {
            try {
                let user = await UserModel.findById(req.params.id);

                if (!user) return res.status(401).json({ success: false, msg: 'User is not found' })

                if (user.role === 'admin') user.role = 'user';
                else user.role = 'admin';

                await user.save();

                return res.status(200).json({ success: true, msg: 'User role updated successfully', user });

            } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }
        },

        //Function to delete a user, using DELETE '/api/admin/deleteUser'
        async deleteUser(req, res) {
            try {
                let user = await UserModel.findById(req.params.id);

                if (!user) return res.status(401).json({ success: false, msg: 'User is not found' })

               //Deleting the avatar
                if(user.avatar.public_id)
                    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

                await UserModel.deleteOne({_id:req.params.id});

                return res.status(200).json({ success: true, msg: 'User deleted successfully' });

            } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }
        },
    }
}

module.exports = AdminController;