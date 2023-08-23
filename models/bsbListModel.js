const mongoose = require('mongoose')

const bsbSchema =  mongoose.Schema({
    systems: {
        type: String,
        default: ''
    },
    browsers:{
        type: String,
        default:[]
    }
})

const Bsb = mongoose.model('Bsb',bsbSchema)
module.exports = Bsb