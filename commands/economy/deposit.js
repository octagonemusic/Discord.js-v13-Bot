const Discord = require('discord.js')
const economy = require('../../utils/economy')
const items = require('../../utils/shopitems')
const inventory = require('../../schemas/inv-schema')


module.exports = {
  name: 'deposit',
  description: "Deposits the specified amount of OctaCreds from your wallet to the bank.",
  aliases: ['dep'],
  usage: "<amount>",
  timeout: 5,
  run: async (client, message, arguments) => {
    const { guild, member } = message
    const coinsOwned = await economy.getCoins(guild.id, member.id)
    const bankOwned = await economy.getBank(guild.id, member.id)


    const itemToBuy = 'banknote'


    const validItem = !!items.find(
        (val) => val.item.toLowerCase() === itemToBuy
    )


    const coinsToGive = arguments[0]

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
            if (arguments[0] === 'max') {

              if (coinsOwned >= 30001) {
                  message.reply(`**You cannot deposit more than \`30000\` OctaCreds in the Bank!**`)
              } else {
              const xD = await economy.addBank(guild.id, member.id, coinsOwned)
              const mf = await economy.addCoins(
                  guild.id,
                  member.id,
                  coinsOwned * -1
                )
      
                message.reply(
                  {embeds: [new Discord.MessageEmbed()
                  .setTitle('Deposited!')
                  .setColor('RANDOM')
                  .setFooter(`Deposited by ${message.author.username}`, message.author.displayAvatarURL())
                  .addFields(
                    {
                      name: `Deposited Amount`,
                      value: `\`${coinsOwned}\` OctaCreds`,
                    },
                    {
                      name: `Wallet Amount`,
                      value: `\`${mf}\` OctaCreds`
                    },
                    {
                      name: `Bank Amount`,
                      value: `\`${xD}\` OctaCreds`
                    }
                  )]}
                )
              }
              return 
          } 
          if (isNaN(coinsToGive)) {
            message.reply('Please provide a valid number of OctaCreds to deposit in the bank.')
            return
          }
      
         
          if (coinsOwned < coinsToGive) {
            message.reply(`You do not have ${coinsToGive} OctaCreds in your wallet to deposit in the bank!`)
            return
          } 
      
          if (coinsToGive >= 30001) {
              message.reply(`You cannot deposit more than 30000 OctaCreds in the Bank!`)
            return
          }
      
          if (bankOwned >= 30000) {
             message.reply(`You cannot deposit more than 30000 OctaCreds in the Bank!`)
             return
          }
      
          const remainingCoins = await economy.addCoins(
            guild.id,
            member.id,
            coinsToGive * -1
          )
          const newBalance = await economy.addBank(guild.id, member.id, coinsToGive)
      
          message.reply(
            {embeds: [new Discord.MessageEmbed()
            .setTitle('Deposited!')
            .setColor('RANDOM')
            .setFooter(`Deposited by ${message.author.username}`, message.author.displayAvatarURL())
            .addFields(
              {
                name: `Deposited Amount`,
                value: `\`${coinsToGive}\` OctaCreds`
              },
              {
                name: `Wallet Amount`,
                value: `\`${remainingCoins}\` OctaCreds`
              },
              {
                name: `Bank Amount`,
                value: `\`${newBalance}\` OctaCreds`
              }
            )]}
          )
      
          } else {
            if (arguments[0] === 'max') {

              if (coinsOwned >= 60001) {
                  message.reply(`**You cannot deposit more than \`60000\` Credits in the Bank!**`)
              } else {
              const xD = await economy.addBank(guild.id, member.id, coinsOwned)
              const mf = await economy.addCoins(
                  guild.id,
                  member.id,
                  coinsOwned * -1
                )
      
                message.reply(
                  {embeds: [new Discord.MessageEmbed()
                  .setTitle('Deposited!')
                  .setColor('RANDOM')
                  .setFooter(`Deposited by ${message.author.username}`, message.author.displayAvatarURL())
                  .addFields(
                    {
                      name: `Deposited Amount`,
                      value: `\`${coinsOwned}\` OctaCreds`
                    },
                    {
                      name: `Wallet Amount`,
                      value: `\`${mf}\` OctaCreds`,
                    },
                    {
                      name: `Bank Amount`,
                      value: `\`${xD}\` OctaCreds`
                    }
                  )]}
                )
              }
              return 
          } 
          if (isNaN(coinsToGive)) {
            message.reply('Please provide a valid number of OctaCreds to deposit in the bank.')
            return
          }
      
         
          if (coinsOwned < coinsToGive) {
            message.reply(`You do not have ${coinsToGive} OctaCreds in your wallet to deposit in the bank!`)
            return
          } 
      
          if (coinsToGive >= 60001) {
              message.reply(`You cannot deposit more than 60000 OctaCreds in the Bank!`)
            return
          }
      
          if (bankOwned >= 60000) {
             message.reply(`You cannot deposit more than 60000 OctaCreds in the Bank!`)
             return
          }
      
          const remainingCoins = await economy.addCoins(
            guild.id,
            member.id,
            coinsToGive * -1
          )
          const newBalance = await economy.addBank(guild.id, member.id, coinsToGive)
      
          message.reply(
            {embeds: [new Discord.MessageEmbed()
            .setTitle('Deposited!')
            .setColor('RANDOM')
            .setFooter(`Deposited by ${message.author.username}`, message.author.displayAvatarURL())
            .addFields(
              {
                name: `Deposited Amount`,
                value: `\`${coinsToGive}\` OctaCreds`
              },
              {
                name: `Wallet Amount`,
                value: `\`${remainingCoins}\` OctaCreds`
              },
              {
                name: `Bank Amount`,
                value: `\`${newBalance}\` OctaCreds`
              }
            )]}
          )
      
          }
      } else {
        if (arguments[0] === 'max') {

          if (coinsOwned >= 30001) {
              message.reply(`**You cannot deposit more than \`30000\` OctaCreds in the Bank!**`)
          } else {
          const xD = await economy.addBank(guild.id, member.id, coinsOwned)
          const mf = await economy.addCoins(
              guild.id,
              member.id,
              coinsOwned * -1
            )
  
            message.reply(
             {embeds: [ new Discord.MessageEmbed()
              .setTitle('Deposited!')
              .setColor('RANDOM')
              .setFooter(`Deposited by ${message.author.username}`, message.author.displayAvatarURL())
              .addFields(
                {
                  name: `Deposited Amount`,
                  value: `\`${coinsOwned}\` OctaCreds`
                },
                {
                  name:  `Wallet Amount`,
                  value: `\`${mf}\` OctaCreds`
                },
                {
                  name: `Bank Amount`,
                  value: `\`${xD}\` OctaCreds`
                }
              )]}
            )
          }
          return 
      } 
      if (isNaN(coinsToGive)) {
        message.reply('Please provide a valid number of OctaCreds to deposit in the bank.')
        return
      }
  
     
      if (coinsOwned < coinsToGive) {
        message.reply(`You do not have ${coinsToGive} OctaCreds in your wallet to deposit in the bank!`)
        return
      } 
  
      if (coinsToGive >= 30001) {
          message.reply(`You cannot deposit more than 30000 OctaCreds in the Bank!`)
        return
      }
  
      if (bankOwned >= 30000) {
         message.reply(`You cannot deposit more than 30000 OctaCreds in the Bank!`)
         return
      }
  
      const remainingCoins = await economy.addCoins(
        guild.id,
        member.id,
        coinsToGive * -1
      )
      const newBalance = await economy.addBank(guild.id, member.id, coinsToGive)
  
      message.reply(
        {embeds: [new Discord.MessageEmbed()
        .setTitle('Deposited!')
        .setColor('RANDOM')
        .setFooter(`Deposited by ${message.author.username}`, message.author.displayAvatarURL())
        .addFields(
          {
            name: `Deposited Amount`,
            value: `\`${coinsToGive}\` OctaCreds`
          },
          {
            name: `Wallet Amount`,
            value: `\`${remainingCoins}\` OctaCreds`
          },
          {
            name: `Bank Amount`,
            value: `\`${newBalance}\` OctaCreds`
          }
        )]}
      )
  
      }

  })
    
  },
}