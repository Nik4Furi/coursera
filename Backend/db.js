const mongoose = require('mongoose');
const { MONGO_URI } = require('./src/api/config/config'); //Configuration vars

//Connect app with database
mongoose.connect(process.env.MONGO_URI || MONGO_URI,{useNewUrlParser:true}). 
then( ()=> console.log('Connection to database')). 
catch((e) => console.error('Error occured during connection to database ',e))