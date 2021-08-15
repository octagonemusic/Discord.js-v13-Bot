const economy = require('../../utils/economy')

module.exports = {
  name: 'pay',
  aliases: "give", 
  description: "Pay another user some OctaCreds.",
  timeout: 5,
  usage: "<member> <amount>",
  run: async (client, message, arguments) => {
    const { guild, member } = message

    const target = message.mentions.users.first()
    if (!target) {
      message.reply('Please specify someone to give OctaCreds to.')
      return
    }

    const coinsToGive = arguments[1]
    if (isNaN(coinsToGive)) {
      message.reply('Please provide a valid number of OctaCreds to give.')
      return
    }

    const coinsOwned = await economy.getCoins(guild.id, member.id)
    if (coinsOwned < coinsToGive) {
      message.reply(`You do not have \`${coinsToGive}\` OctaCreds!`)
      return
    }

    const remainingCoins = await economy.addCoins(
      guild.id,
      member.id,
      coinsToGive * -1
    )
    const newBalance = await economy.addCoins(guild.id, target.id, coinsToGive)

    message.reply(
      `You have given <@${target.id}> \`${coinsToGive}\` OctaCreds! They now have \`${newBalance}\` OctaCreds and you have \`${remainingCoins}\` OctaCreds!`
    )
  },
}