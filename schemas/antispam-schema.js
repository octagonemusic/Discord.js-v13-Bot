const mongoose = require("mongoose")

const antispamSchema = mongoose.Schema({
    guildId: {
        type: String
    },
    enabled: {
        type: Number
    }
})

module.exports = mongoose.model(`antispam-toggle`, antispamSchema)