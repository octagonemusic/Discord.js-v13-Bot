const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const autowarnSchema = mongoose.Schema({
  guildId: reqString,
  userId: reqString,
  warns: {
    type: Number,
    default: 0,
  }
})
module.exports = mongoose.model('autowarns', autowarnSchema)