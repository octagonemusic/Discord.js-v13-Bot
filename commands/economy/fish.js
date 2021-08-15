const Discord = require('discord.js')
const inventory = require('../../schemas/inv-schema')
const items = require('../../utils/shopitems')
const economy = require('../../utils/economy')

module.exports = {
    name: 'fish',
  description: "Go fishing to earn some extra OctaCreds.",
  timeout: 180000,
  run: async (client, message, args) => {

        const { guild, member } = message

        const itemToBuy = 'fishing pole'


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
                    message.reply(`You need a \`Fishing Pole\` to fish!`)
                } else {
                    if (data.Inventory[itemToBuy] === 0) {
                        message.reply(`You need a \`Fishing Pole\` to fish!`)
                    } else {
                        const OctaCreds = Math.floor(Math.random()*(1500 - 1000) + 1000) + 1

                        const newCoins = await economy.addCoins(guildId, userId, OctaCreds)
                        if (OctaCreds === 0) {
                            message.reply(`You didn't catch any fish, what a loser lol`)
                        } else {
                            message.reply(`You went fishing and got \`${OctaCreds}\` OctaCreds from selling fish!`)
                        }
                    }
                }

            } else {
                message.reply(`You need a \`Fishing Pole\` to fish!`)
            }

        })
    }
}