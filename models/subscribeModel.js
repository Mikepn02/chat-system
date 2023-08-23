const mongoose = require('mongoose')

const  subscribeSchema = mongoose.Schema({

    iduser:String,
    sub:String,
    topic:String,
    topic1: String,
    timesStart: String,
    timeFinish:String,
    timesis:String,
})

const Subscribe = mongoose.mode('Subscribe',subscribeSchema)
module.exports = Subscribe