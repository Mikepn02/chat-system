const mongoose = require('mongoose')

const intromsgSchema = mongoose.Schema({
    category: {
        type:String,
        require:true
    },
    adress: String,
    msg: String
})

const Intromsg = mongoose.model('Intromsg',intromsgSchema)
module.exports = Intromsg