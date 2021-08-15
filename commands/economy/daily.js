const economy = require('../../utils/economy')
module.exports = {
  name: 'daily',
  description: "Claim your daily rewards!",
  timeout: 86400000,
  run: async (client, message, arguments) => {
    
    const guildId = message.guild.id
    const userId = message.author.id    
    const OctaCreds = Math.floor(Math.random()*(1000 - 500) + 500) + 1

    const newCoins = await economy.addCoins(guildId, userId, OctaCreds)

    message.reply(
      `**You got \`${OctaCreds}\` OctaCreds.**`
    )
  },
}