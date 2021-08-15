const Discord = require('discord.js')
const inventory = require('../../schemas/inv-schema')
const items = require('../../utils/shopitems')
const economy = require('../../utils/economy')

module.exports = {
    name: 'postmeme',
    aliases: ['pm'],
  description: "Post a meme to extra OctaCreds.",
  timeout: 180000,
  run: async (client, message, args) => {

        const { guild, member } = message

        const itemToBuy = 'laptop'


        const validItem = !!items.find(
            (val) => val.item.toLowerCase() === itemToBuy
        )




        const params = {
            guildId: guild.id,
            userId: member.id
        }

        const guildId = guild.id
        const userId = member.id
        inventory.findOne(params, async (err, data) => {

            if (data) {
                const hasItem = Object.keys(data.Inventory).includes(itemToBuy)
                if (!hasItem) {
                   message.reply(`You need a \`Laptop\ to post memes!`)
                } else {
                    if (data.Inventory[itemToBuy] === 0) {
                        message.reply(`You need a \`Laptop\` to post memes!`)
                    } else { 
                    const OctaCreds = Math.floor(Math.random()*(1500 - 1000) + 1000) + 1

                    const newCoins = await economy.addCoins(guildId, userId, OctaCreds)

                    message.reply(`You posted a meme on Reddit and got \`${OctaCreds}\` OctaCreds! Nice meme bro!`)
                }
            }
            } else {
                message.reply(`You need a \`Laptop\` to post memes!`)
            }

        })
    }
}