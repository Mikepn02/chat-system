const mongoose = require('mongoose')


const ownerSchema = mongoose.Schema({
    bars: {
        type:Boolean,
        default: true
    },
    vpn:{
        type: Boolean,
        default:false
    },
    gust:{
        type: String,
    },
    dataFinish: {
        type: Date,
        default: Date.now()
    },
    maxRep:{
        type: Number,
        default: 3
    },
    Tv:{
        type:String,
    },
    visitor:{
        type:String
    },
    room:{
      type: String
    },
    isbanner: {
        type: Boolean,
        default: false
    },
    isbanner1: {
        type: Boolean,
        default: false
    },
    isbanner2: {
        type: Boolean,
        default: false
    },
    isbanner3: {
        type: Boolean,
        default: false
    },
    rc: {
        type: Boolean,
        default: false
    },
    comment: {
        type: Boolean,
        default: false
    },
    offline: {
        type: Boolean,
        default: false
    }
})

const Owner = mongoose.model('Owner',ownerSchema)
module.exports = Owner