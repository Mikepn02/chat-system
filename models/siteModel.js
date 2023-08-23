const mongoose = require('mongoose')

const  siteSchema = mongoose.Schema({
    banner: {
        type: String
    },
    pmpic:String,
    prvpic:String,
    prv2pic:String,
    prv3pic: String,
    host: String,
    ids:Number,
    logo: String,
})

const Site = mongoose.mode('Site',siteSchema)
module.exports = Site