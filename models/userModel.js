const mongoose = require('mongoose');

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
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
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

const User = mongoose.model('User', userSchema);

module.exports = User;
