const mongoose = require('mongoose')


const botSchema = mongoose.Schema({
    idreg:{
        type:Number,
        unique:true,
        require: true
    },
    msg: {
        type: String,
        default: "(عضو جديد)"
    },
    pic: {
        type: String,
        default: "pic.png"
    },
    im1: {
        type: String,
        default: "im1.png"
    },
    power: String,
    country: String,
    room: String,
    ip: String,
    id: String,
    stat: {
        type: Number,
        default: 0
    },
    topic: String
})


botSchema.pre('save', async function(next) {
    if(!this.idreg){
        const highdreg = await  Bots.findOne().sort({idreg : -1}).select('idreg')
        this.idreg = highdreg ? highdreg.idreg + 1 : 1;
    }
})

const Bots = mongoose.model('Bar',botSchema)
module.exports = Bots