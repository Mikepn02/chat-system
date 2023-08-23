const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    bg: {
        type: String,
        default: "#FFFFFF"
    },
    mcol: {
        type: String,
        default: "#000000"
    },
    ucol: {
        type: String,
        default: "#000000"
    },
    evaluation: {
        type: Number,
        default: 0
    },
    ico: String,
    ip: String,
    fp: String,
    id: String,
    lid: String,
    uid: String,
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
    im2: {
        type: String,
        default: "im2.png"
    },
    im3: {
        type: String,
        default: "im3.png"
    },
    power: String,
    rep: {
        type: Number,
        default: 0
    },
    topic: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password :{
        type:String,
        required:[true,'Please provide a password'],
        minlength:8
    },
    passwordConfirm:{
      type: String,
      required:[true,'please confirm your password'],
      validate:{
        validator: function(el) {
            return el === this.password
        }
      }
    },
    token: {
        type: String
    },
    loginG: {
        type: Boolean,
        default: false
    },
    muted: {
        type: Boolean,
        default: false
    },
    documentationc: {
        type: Number,
        default: 0
    },
    lastssen: String,
    joinuser: String
});


userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,12)
    this.passwordConfirm = undefined
    next()
})
userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
){
    return await bcrypt.compare(candidatePassword , userPassword)
}

const User = mongoose.model('User', userSchema);

module.exports = User;
