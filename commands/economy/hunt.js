const Discord = require('discord.js')
const inventory = require('../../schemas/inv-schema')
const items = require('../../utils/shopitems')
const economy = require('../../utils/economy')

module.exports = {
    name: 'hunt',
  description: "Go hunting to earn some extra OctaCreds.",
  timeout: 180000,
  run: async (client, message, args) => {

        const { guild, member } = message

        const itemToBuy = 'hunting rifle'


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
                    message.reply(`You need a \`Hunting Rifle\` to hunt!`)
                } else {
                    if (data.Inventory[itemToBuy] === 0) {
                        message.reply(`You need a \`Hunting Rifle\` to hunt!`)
                    } else {
                        const OctaCreds = Math.floor(Math.random()*(1500 - 1000) + 1000) + 1


                        const newCoins = await economy.addCoins(guildId, userId, OctaCreds)
                        if (OctaCreds === 0) {
                            message.reply(`You didn't find anything to hunt, what a loser lol`)
                        } else {
                            message.reply(`You went hunting and got \`${OctaCreds}\` OctaCreds from selling your prey!`)
                        }
                    }
                }

            } else {
                message.reply(`You need a \`Hunting Rifle\` to hunt!`)
            }

        })
    }
}