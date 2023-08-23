const mongoose = require('mongoose')

const  settingSchema = mongoose.Schema({
    site: String,
    dro3: String,
    emo:String,
    sico: String
})

const Setting = mongoose.mode('Room',settingSchema)
module.exports = Setting