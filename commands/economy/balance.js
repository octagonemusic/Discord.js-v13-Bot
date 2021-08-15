const Discord  = require('discord.js')
const economy = require('../../utils/economy')

module.exports = {
  name: 'balance',
  description: "Shows your's or the mentioned member's balance.",
  aliases: ['bal'],
  usage: "<member>",
  timeout: 5,
  run: async (client, message, args) => {
    const target = message.mentions.users.first() || message.author
    const targetId = target.id

    const guildId = message.guild.id
    const userId = target.id

    const coins = await economy.getCoins(guildId, userId)
    const bank = await economy.getBank(guildId, userId)

    const embed = new Discord.MessageEmbed()
    .setAuthor(message.guild.name)
    .setTitle(`${target.tag}'s Balance!`)
    .addFields(
      {
        name: `Wallet`,
        value: `\`${coins} OctaCreds\``
      },
      {
        name: `Bank`,
        value: `\`${bank}\` OctaCreds`
      }
    )
    .setColor('RANDOM')
    .setFooter(`Balance requested by ${message.author.username}`, message.author.displayAvatarURL())

    message.reply({embeds: [embed]})
  },
}