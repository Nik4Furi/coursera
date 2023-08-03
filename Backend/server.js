console.log('Welcome in coursera, learn new something');

const { SERVER, PORT, VERSION } = require('./src/api/config/config'); //Configuration stuff, is used when main app variables are not work, as work backup like

require('dotenv').config() //When you install first column dependies
require('./db') //When configure your connection with database

const express = require('express')
const app = express();

// const cors = require('cors'); //When your app's api connect with the forntend applications
// app.use(cors())

//When use your app any json object or form fill up
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//------------ Configure that our app is running at the brower
app.get('/',(req,res)=>{
    res.send('Welcome in coursera');
})

//Setup our routes dependence of versions
const Version = process.env.VERSION || VERSION ;
if(Version === 'v1'){
    console.log('coursera v1');
    
    const routers = require('./src/api/v1/routers') //Connect your routes here

    app.use('/api',routers) //Can define path or respose of your apis path
}

const Server = process.env.SERVER || SERVER;
const Port = process.env.PORT || PORT ;

app.listen(Port,()=> console.info(`Application listen at ${Server}:${Port}`))