const mongoose = require('mongoose')

const  powerSchema = mongoose.Schema({
   power: String
})

const Power = mongoose.model('Power',powerSchema)
module.exports = Power