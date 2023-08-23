const mongoose = require('mongoose')


const bandSchema = mongoose.Schema({
     nameBand: {
        type: String,
        required:true
     },
     type:{
        type: String,
     },
     decodeDans: String,
     deviceBand:String,
     ip_band: String,
     country_band: String,
     date:{
        type: Date,
        default:"دائم"
     }
})

const Band = mongoose.model('Band',bandSchema)
module.exports = Band