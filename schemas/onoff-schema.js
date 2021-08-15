const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const onoffSchema = mongoose.Schema({
  guildId: reqString,
  userId: reqString,
  off: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('on-off', onoffSchema)