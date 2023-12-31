//---------------- Model Specific Stuff
const StatsModel = require("../models/StatsModel");
const UserModel = require("../models/UserModel");

//----------- Packages Specific stuff
const cloudinary = require('cloudinary')

//------------- Controller for controlling admin actions -------------------------X
function AdminController() {

    return {

        //Function to fetch all the users, using GET '/api/admin/fetchAllUsers'
        async fetchAllUsers(req, res) {
            try {
                const users = await UserModel.find();
                if (users.length == 0) return res.status(200).json({ success: true, msg: 'No user yet' });

                return res.status(200).json({ success: true, msg: 'Fetch all the users', Length: users.length, users })

            } catch (error) { return res.status(500).json({ success: false, msg: error }); }
        },


        //Update the users profiles/role, using PUT '/api/admin/updateUserProfile/:id'
        async updateUserProfile(req, res) {
            try {
                let user = await UserModel.findOne({ _id: req.params.id });

                if (!user) return res.status(401).json({ success: false, msg: 'User is not found' })

                if (user.role === 'admin') user.role = 'user';
                else user.role = 'admin';

                await user.save();

                return res.status(200).json({ success: true, msg: 'User role updated successfully', user });

            } catch (error) { return res.status(500).json({ success: false, msg: error }); }
        },

        //Function to delete a user, using DELETE '/api/admin//deleteUser/:id'
        async deleteUser(req, res) {
            try {
                let user = await UserModel.findById(req.params.id);

                if (!user) return res.status(401).json({ success: false, msg: 'User is not found' })

                //Deleting the avatar
                if (user.avatar.public_id)
                    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

                await UserModel.deleteOne({ _id: req.params.id });

                return res.status(200).json({ success: true, msg: 'User deleted successfully' });

            } catch (error) { return res.status(500).json({ success: false, msg: error }); }
        },

        //Function to show the details of our app in form of stats, using GET '/api/admin/stats'
        async Stats(req, res) {
            try {
                //-------- Fetch all the stats data
                const stats = await StatsModel.find().sort({ createdAt: "desc" }).limit(12); //12 means 12 months data only

                //---------- create the stats data to show in dashbaord
                const statsData = [];

                for (let item of stats)
                    statsData.unshift(item); //Is depned upon the stats data what is in have

                const requiredLength = 12 - stats.length; // if stats data have less than 12 month data

                for (let i = 0; i < requiredLength; i++)
                    statsData.unshift({ users: 0, subscription: 0, views: 0 }); //add at front


                const usersCount = Number(statsData[11].users); //find last month data only
                const subscriptionsCount = Number(statsData[11].subscription);
                const viewsCount = Number(statsData[11].views);

                //---------- Now we try to calculate the profit or not ------------
                let usersProfit = true, subscriptionsProfit = true, viewsProfit = true;
                let usersPercentage = 0, subscriptionsPercentage = 0, viewsPercentage = 0;

                //Check if 2nd last month have no users then
                if (statsData[10].users == 0) usersPercentage = usersCount * 100;
                if (statsData[10].subscription == 0) subscriptionsPercentage = subscriptionsCount * 100;
                if (statsData[10].views == 0) viewsPercentage = viewsCount * 100;

                else { // o/w try to calculate the differences in form of percentage
                    const differences = {
                        users: Number(statsData[11].users) - Number(statsData[10].users),
                        subscription: Number(statsData[11].subscription) - Number(statsData[10].subscription),
                        views: Number(statsData[11].views) - Number(statsData[10].views)
                    };

                    //Now calculate in percentage
                    usersPercentage = Number((differences.users / statsData[10].users) * 100);
                    subscriptionsPercentage = Number((differences.subscription / statsData[10].subscription) * 100);
                    viewsPercentage = Number((differences.views / statsData[10].views) * 100);

                    //Check if percentage negative, then we got loss, by default we are in profilt
                    if (usersPercentage < 0) usersProfit = false;
                    if (subscriptionsPercentage < 0) subscriptionsProfit = false;
                    if (viewsPercentage < 0) viewsProfit = false;

                }

                //----------- Send the data of stats
                const Counts = {
                    usersCount, subscriptionsCount, viewsCount
                }
                const Profit = {
                    usersProfit, subscriptionsProfit, viewsProfit
                }
                const Percentage = {
                    usersPercentage, subscriptionsPercentage, viewsPercentage
                }

                const data = {
                    statsData, Counts, Profit, Percentage
                }

                return res.status(200).json({ success: true, msg: 'Show the stats data ', data })

            } catch (error) { return res.status(500).json({ success: false, msg: error }) }
        }
    }
}

module.exports = AdminController;