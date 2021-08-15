const mongoose = require('mongoose')

const warnSchema = new mongoose.Schema({
    guildid: String,
    user: String,
    content: Array
})

module.exports = mongoose.model('warns', warnSchema)