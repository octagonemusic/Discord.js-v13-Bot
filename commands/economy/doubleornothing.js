const Discord = require('discord.js')
const economy = require('../../utils/economy')
module.exports = {
    name: 'doubleornothing',
  description: "Gamble a specified amount of money.",
  aliases: ['gambledouble'],
  usage: "<member>",
  timeout: 180000,
  run: async(client, message, args) => {

        const { guild, member } = message
        if(!args[0]) return message.reply(`Please specify an amount to bet!`)

        if(isNaN(args[0])) return message.reply(`Please specify a valid number to bet!`)

        const amountToBet = parseInt(args[0])
        const coinsOwned = await economy.getCoins(guild.id, member.id)

        

        function random() {
            const num = Math.floor(Math.random() * 2);
            return num === 1
        }

        if(coinsOwned < amountToBet){
            message.reply(`You do not have sufficient funds to bet!`)
        } else if (random() === true) {
            const winAmount = amountToBet * 2
            const newCoins = await economy.addCoins(guild.id, member.id, winAmount)
            message.reply(`Congratulations! You just won \`${winAmount}\` OctaCreds!`)
        } else {
            const remainingCoins = await economy.addCoins(
                guild.id,
                member.id,
                amountToBet * -1
              )

              message.reply(`You lost! You now have \`${remainingCoins}\` Octacreds!`)
        }
    }
}