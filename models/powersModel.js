const mongoose = require('mongoose')

const  powerSchema = mongoose.Schema({
   power: String
})

const Power = mongoose.mode('Power',powerSchema)
module.exports = Power