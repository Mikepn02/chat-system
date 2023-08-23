const mongoose = require('mongoose')


const hitsletterSchema = mongoose.Schema({
     ip:{
        type: String,
        
     },
     msg:{
        type: String
     },
     topic:{
        type: String
     },
     v: {
        type:String
     }
})

const Hits = mongoose.model('Hits',hitsletterSchema)
module.exports = Hits