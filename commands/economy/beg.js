const economy = require('../../utils/economy')

module.exports = {
  name: 'beg',
  description: "Beg for some OctaCreds.",
  timeout: 60000,
  run: async (client, message, args) => {
    
    const guildId = message.guild.id
    const userId = message.author.id    
    const OctaCreds = Math.floor(Math.random()*(500 - 100) + 100) + 1
    const newCoins = await economy.addCoins(guildId, userId, OctaCreds)

    message.reply(
      `**You begged and got \`${OctaCreds}\` OctaCreds.**`
    )
  },
}

