const mongoose = require('mongoose')

const  namesSchema = mongoose.Schema({
     iduser:{
        type:String,
        unique:true
     },
     fp:String,
     ip:String,
     topic:String,
     username:{
        type:String,
        required:true,
        unique: true
     }
})

const Names = mongoose.model('Names',namesSchema)
module.exports = Names