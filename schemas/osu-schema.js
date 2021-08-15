const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const osuSchema = mongoose.Schema({
  userId: reqString,
  osuuser: {
      type: String
  }
})

module.exports = mongoose.model('osu profiles', osuSchema)