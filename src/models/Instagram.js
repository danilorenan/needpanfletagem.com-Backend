const mongoose = require('mongoose');

const InstagramSchema = new mongoose.Schema({
    link:{type:String, require:true}
})

module.exports = mongoose.model('InstagramSchema', InstagramSchema)