const Discord = require('discord.js')
const inventory = require('../../schemas/inv-schema')
const items = require('../../utils/shopitems')
const economy = require('../../utils/economy')
module.exports = {
    name: 'buy',
  description: "Buy something from the store.",
  usage: "<item>",
  timeout: 5,
  run: async(client, message, args) => {

        const { guild, member } = message
        if(!args[0]) return message.reply(`**Please specify an item to buy!**`)
        const itemToBuy = args.join(' ')

        const validItem = !!items.find(
            (val) => val.item.toLowerCase() === itemToBuy
            )
        if(!validItem) return message.reply(`**Please specify a _valid_ item to buy!**`)

        const itemPrice = items.find((val) => val.item.toLowerCase() === itemToBuy)
        .price


        const userBalance = await economy.getCoins(guild.id, member.id)
        if(userBalance < itemPrice) return message.reply(`**You do not have sufficient OctaCreds to buy that item!**`)

        const params = {
            guildId: guild.id,
            userId: member.id
        } 
        inventory.findOne(params, async(err, data) => {
            if(data) {
                const hasItem = Object.keys(data.Inventory).includes(itemToBuy)
                if(!hasItem) {
                    data.Inventory[itemToBuy] = 1
                } else {
                    data.Inventory[itemToBuy]++
                }
                console.log(data)
                await inventory.findOneAndUpdate(params, data)
            } else {
                new inventory({
                    guildId: guild.id,
                    userId: member.id,
                    Inventory: {
                        [itemToBuy]: 1,
                    },
                }).save()
            }
            message.reply(`**You have successfullly bought a \`${itemToBuy}\`**`)
            const remainingCoins = await economy.addCoins(guild.id, 
                member.id, 
                itemPrice * -1)
        })
    }
}