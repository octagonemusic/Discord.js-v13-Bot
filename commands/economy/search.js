const Discord = require('discord.js')
const economy = require('../../utils/economy')

module.exports = {
    name: 'search',
  description: "Search for some extra OctaCreds.",
  timeout: 60000,
  run: async(client, message, args) => {
        const jobs = [`Wallet`, `Tree`, `Bush`, `Air`, `Hospital`, `Office`, `Bank`, 'Car', `Van`, `Basement`, `Street`, `Pantry`, `Couch`, `Bus`, `Bar`, `Fridge`, `Attic`, `Laundromat`, `Purse`, `Coat`]

        const guildId = message.guild.id
       const userId = message.author.id 

        const jobIndex = Math.floor(Math.random() * jobs.length)
        const OctaCreds = Math.floor(Math.random()*(500 - 100) + 100) + 1

    const newCoins = await economy.addCoins(guildId, userId, OctaCreds)

    message.reply(`You searched \`${jobs[jobIndex]}\` and found \`${OctaCreds}\` OctaCreds. `)
    }
}