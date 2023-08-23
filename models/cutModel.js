const mongoose = require('mongoose')

const cutSchema = mongoose.Schema({
    text1:{
        type: String
    },
    text2:{
        type: String
    }
})

const Cut = mongoose.model('Cut',cutSchema)
module.exports = Cut