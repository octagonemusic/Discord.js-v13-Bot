const Discord = require('discord.js')
const inventory = require('../../schemas/inv-schema')

module.exports = {
    name: 'inventory',
    aliases: ["inv"],
  description: "Checks your inventory.",
  timeout: 5,
  run: async (client, message, args) => {

        const { guild, member } = message
        inventory.findOne(
            { guildId: guild.id, userId: member.id },
            async (err, data) => {
                if (!data) return message.reply(`**Your inventory is empty!**`)
                const mappedData = Object.keys(data.Inventory)
                    .map((key) => {
                        return `**${data.Inventory[key]} ${key}(s)**`;
                    })

                
                    message.reply(
                        {embeds: [new Discord.MessageEmbed()
                        .setTitle(`${message.author.username}'s Inventory!`)
                        .setDescription(mappedData.join("\n\n"))
                        .setColor("RANDOM")]}
                    )
            }
        )
    },
}