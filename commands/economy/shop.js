const Discord = require('discord.js')
const items = require('../../utils/shopitems')

module.exports = {
    name: 'shop',
    aliases: ['store'],
  description: "Shows the items that are for sale.",
  timeout: 5,
  run: async(client, message, args) => {
        if(items.length === 0) return message.reply(`There are no items for sale!`)

        const shopList = items.map((value, index) => {
                return `**${index+1}. __${value.item}__:**
**Price:** \`${value.price}\` Octacreds 
**Description:**  \`${value.description}\``
            })

            message.reply(
               {embeds: [ new Discord.MessageEmbed()
                .setTitle(`Welcome to Shop!`)
                .setDescription(shopList.join("\n\n"))
                .setColor("RANDOM")
                .setFooter(`${message.author.username} has entered the shop!`, message.author.displayAvatarURL())
                .setTimestamp()]}
            )
    }
}