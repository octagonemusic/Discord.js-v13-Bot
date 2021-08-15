const Discord = require('discord.js')
const economy = require('../../utils/economy')

module.exports = {
    name: 'rich',
  description: "Shows the richest members in the server.",
  timeout: 5,
  run: async(client, message, args) => {

        const{ guild, member } = message
        const collection = new Discord.Collection()

        await Promise.all(
            message.guild.members.cache.map(async (member) => {
                const id = member.id
                const bal = await economy.getCoins(guild.id, member.id)
                console.log(`${member.user.tag} -> ${bal}`)
                return bal !== 0 
                ? collection.set(id, {
                    id,
                    bal,
                })  
                : null
            })
        )
        const data = collection.sort((a, b) => b.bal - a.bal).first(5)
        const lb = data.map((v, i) => {
            return `**${i + 1}.** __**${message.client.users.cache.get(v.id).tag}** __
__**OctaCreds**__: **${ v.bal} OctaCreds**`;
        })

        
        message.reply(
           {embeds: [ new Discord.MessageEmbed()
            .setTitle(`Top 5 richest people in ${message.guild.name}`)
            .setDescription(lb.join("\n\n"))
            .setColor("RANDOM")]}
        )
    },
}