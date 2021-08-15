const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const profileSchema = mongoose.Schema({
  guildId: reqString,
  userId: reqString,
  OctaCreds: {
    type: Number,
    default: 0,
  },
  BankCreds: {
    type: Number, 
    default: 0,
  },
  Passive: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('profiles', profileSchema)