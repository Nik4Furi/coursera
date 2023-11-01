const mongoose = require('mongoose')

//--------- Create the schema to show what data to admin
const StateSchema = new mongoose.Schema({
    users : {type:Number, default:0},
    subscription : {type:Number, default:0},
    views : {type:Number, default:0}
},{timestamps : true})

const StatsModel = mongoose.model('Stat',StateSchema);

module.exports = StatsModel;