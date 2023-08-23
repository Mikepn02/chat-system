const mongoose = require('mongoose')

const logSchema = mongoose.Schema({
    state: {
        type:String,
        required:true
    },
    topic: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    ip:{
        type: String
    },
    code: String,
    device:{
        type: String,
        default: ' en',
        
    },
    isin: String,
    time:String
})

const Log = mongoose.model('Log',logSchema)
module.exports = Log