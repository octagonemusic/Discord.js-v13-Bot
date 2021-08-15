const mongoose = require('mongoose')

const inventory = mongoose.Schema({
  guildId: {
    type: String,
  },
  userId: {
    type: String,
  },
  Inventory: {
    type: Object,
  },
})

module.exports = mongoose.model('Inventory', inventory)