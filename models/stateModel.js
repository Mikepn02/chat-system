const mongoose = require('mongoose')

const  stateSchema = mongoose.Schema({
    state: {
        type: String
    },
    topic:String,
    username:{
        type: String,
        unique: true,
        required:true
    },
    room:String,
    ip: String,
    time: String,

})

const State = mongoose.mode('State',stateSchema)
module.exports = State