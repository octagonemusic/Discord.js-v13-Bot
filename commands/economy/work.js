const Discord = require('discord.js')
const economy = require('../../utils/economy')
module.exports = {
    name: 'work',
  description: "Work to earn some extra OctaCreds.",
  timeout: 180000,
  run: async(client, message, args) => {
        const jobs = [`Programmer`, `Mason`, `YouTuber`, `Waiter`, `Doctor`, `Mechanic`]

        const guildId = message.guild.id
       const userId = message.author.id 

        const jobIndex = Math.floor(Math.random() * jobs.length)
        const OctaCreds = Math.floor(Math.random()*(1000 - 500) + 500) + 1
    const newCoins = await economy.addCoins(guildId, userId, OctaCreds)

    message.reply(`You worked as a \`${jobs[jobIndex]}\` and earned \`${OctaCreds}\` OctaCreds. `)
    }
}