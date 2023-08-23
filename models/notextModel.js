const mongoose = require('mongoose');

const notextSchema = new mongoose.Schema({
    type: String,
    path: String,
    v: String
});

const NoText = mongoose.model('NoText', notextSchema);

module.exports = NoText;
