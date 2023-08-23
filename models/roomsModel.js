const mongoose = require('mongoose')

const  roomSchema = mongoose.Schema({
    about: {
        type: String
    },
    user:String,
    pass:String,
    id:String,
    owner: String,
    topic: String,
    pic:String,
    color:{
        type: String,
        default:'#000'
    },
    rmli:{
       type: Number,
       default: 0
    },
    welcome: String,
    broadcast:{
        type: Boolean,
        default: false
    },
    deleted:{
        type:Boolean,
        default: false
    },
    needpass:{
        type: Boolean,
        default: false
    },
    max:{
        type: Number,
        default: 0
    }
})

const Room = mongoose.model('Room',roomSchema)
module.exports = Room