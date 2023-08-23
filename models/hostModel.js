const mongoose = require('mongoose')

const  hostSchema = mongoose.Schema({
    hostname: String,
    setting:Number
})

const Host =  mongoose.model('Host',hostSchema)

module.exports = Host