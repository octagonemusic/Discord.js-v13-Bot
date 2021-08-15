const Discord = require('discord.js')
const inventory = require('../../schemas/inv-schema')
const items = require('../../utils/shopitems')
const economy = require('../../utils/economy')

module.exports = {
    name: 'sell',
  description: "Sell items that you own to get some OctaCreds.",
  timeout: 5,
  usage: "<item>",
  run: async(client, message, args) => {

        const { guild, member } = message
        if(!args[0]) return message.reply(`Please specify an item to buy!`)
        const itemToBuy = args.join(' ')

        const validItem = !!items.find(
            (val) => val.item.toLowerCase() === itemToBuy
            )
        if(!validItem) return message.reply(`Please specify a _valid_ item to sell!`)

        const itemPrice = items.find((val) => val.item.toLowerCase() === itemToBuy)
        .price


        const userBalance = await economy.getCoins(guild.id, member.id)

        const params = {
            guildId: guild.id,
            userId: member.id
        } 
        inventory.findOne(params, async(err, data) => {
            if(data) {
                const hasItem = Object.keys(data.Inventory).includes(itemToBuy)
                if(!hasItem) {
                    message.reply(`You do not own this item in your inventory!`)
                } else {
                    if (data.Inventory[itemToBuy] === 0) {
                        message.reply(`You do not own this item in your inventory!`)
                    } else {
                    data.Inventory[itemToBuy]--
                    message.reply(`You have successfullly sold \`${itemToBuy}\``)
                    }
                }
                console.log(data)
                await inventory.findOneAndUpdate(params, data)
            } else {
                message.reply(`You do not own this item in your inventory!`)
            }
            
            const remainingCoins = await economy.addCoins(guild.id, 
                member.id, 
                itemPrice)
        })
    }
}