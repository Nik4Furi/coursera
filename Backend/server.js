console.log('Welcome in coursera, learn new something');

const { SERVER, PORT, VERSION } = require('./src/api/config/config'); //Configuration stuff, is used when main app variables are not work, as work backup like

require('dotenv').config() //When you install first column dependies
require('./db') //When configure your connection with database

const express = require('express')
const app = express();
const nodeCron = require('node-cron'); //used to schedule the task

const cors = require('cors'); //When your app's api connect with the forntend applications
app.use(cors())

//------------------ Configuring the Cloudinary to upload poster and videos
const cloudinary = require('cloudinary');
const StatsModel = require('./src/api/v1/models/StatsModel');

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})



//When use your app any json object or form fill up
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//------------ Configure that our app is running at the brower
app.get('/', (req, res) => {
    res.send('Welcome in coursera');
})

//Setup our routes dependence of versions
const Version = process.env.VERSION || VERSION;
if (Version === 'v1') {
    console.log('coursera v1');

    //--------- Scheduling the task in every month, that will create states
    nodeCron.schedule('0 0 0 1 * *', async () => { //every month
        try {

            
            await StatsModel.create({});

        } catch (error) { }
    })

    // const turn = async()=> {
    //     await StatsModel.create({});

    // }

    // turn();

    //--------------------- Routes ---------------------X
    //Auth Routes
    const AuthRoutes = require('./src/api/v1/routers/AuthRoutes')
    app.use('/api/user', AuthRoutes)

    //Course Routes
    const CourseRoutes = require('./src/api/v1/routers/CourseRoutes')
    app.use('/api/course', CourseRoutes)

    //Playlist Routes
    const PlaylistRoutes = require('./src/api/v1/routers/PlaylistRoutes')
    app.use('/api/playlist', PlaylistRoutes);

    //Admin Routes
    const AdminRoutes = require('./src/api/v1/routers/AdminRoutes')
    app.use('/api/admin', AdminRoutes)

    //Payment Routes
    const PaymentRoutes = require('./src/api/v1/routers/PaymentRoutes')
    app.use('/api/payment', PaymentRoutes)

    //Payment Routes
    const OtherRoutes = require('./src/api/v1/routers/OtherRoutes')
    app.use('/api', OtherRoutes)
}

const Server = process.env.SERVER || SERVER;
const Port = process.env.PORT || PORT;

app.listen(8000, () => console.info(`Application listen at http://localhost:8000`))
// app.listen(Port, () => console.info(`Application listen at ${Server}:${Port}`))