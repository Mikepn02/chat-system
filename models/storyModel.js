const mongoose = require('mongoose')

const  storySchema = mongoose.Schema({
    owner: {
        type: String
    },
    topic:String,
    pic:String,
    views:{
        type: String,
        default:''
    },
    type: String,
    time: String,
    url:String,
    date:{
        type: Date,
        default:Date.now()
    }
})

const Story = mongoose.mode('Story',storySchema)
module.exports = Story