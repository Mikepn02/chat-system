const mongoose = require('mongoose')


const BarSchema = mongoose.Schema({
    bcc: {
        type: String,
        default: []
    },
    likes:{
        type: String,
        default: []
    },
    bg:{
        type: String,
    },
    bid: {
        type: String,
    },
    lid:{
        type: String,
    },
    mcol:{
        type:String,
    },
    msg:{
        type:String
    },
    pic:{
      type: String
    },
    topic: {
        type: String
    },
    ucol: {
        type: String
    },
    uid: {
        type:String
    },
})

const Bar = mongoose.model('Bar',BarSchema)
module.exports = Bar