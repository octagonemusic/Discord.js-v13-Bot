const economy = require('../../utils/economy')
const profileSchema = require('../../schemas/profile-schema')

module.exports = {
  name: 'steal',
  aliases: ["rob"],
  description: "Steal OctaCreds from another user.",
  timeout: 60000,
  run: async (client, message, arguments) => {
    const { guild, member } = message

    const target = message.mentions.users.first()
    if (!target) {
      message.reply('Please specify someone to steal OctaCreds from.')
      return
    }

    const octagone = message.client.users.cache.get('717166815943327764')

    const coinsToSteal = Math.floor(Math.random() * 500) + 1 || 0
   

    const coinsOwned = await economy.getCoins(guild.id, target.id)
    if (coinsOwned < coinsToSteal) {
      message.reply(`That user does not have enough OctaCreds to steal from!`)
      return
    }


    
    profileSchema.findOne({ guildId: guild.id, userId: member.id}, async(err, data) => {
      const passive = data.Passive === 1
      if(passive){
        message.reply(`Exit passive mode to start stealing!`)
      } else {
        profileSchema.findOne({ guildId: guild.id, userId: target.id}, async(err, data) => {
          const passive = data.Passive === 1
          if(passive){
            message.reply(`That user is in passive mode! Leave the peace loving hippies alone!`)
          } else if (coinsToSteal === 0) {
              const punishCoins = Math.floor(Math.random() * 500) + 1
              await economy.addCoins(guild.id, member.id, punishCoins * -1)
              await economy.addCoins(guild.id, target.id, punishCoins)
      
              message.reply(`You got caught trying to steal from ${target.id} and paid them \`${punishCoins}\` OctaCreds!`)
          } else if (target === octagone) {
              
              const remainingCoins = await economy.addCoins(
                  guild.id,
                    octagone.id,
                    coinsToSteal
                  )
                  const newBalance = await economy.addCoins(guild.id, message.author.id, coinsToSteal * -1)
              
                  message.reply(`No stealing from the owner mf. You just paid him \`${coinsToSteal}\` as a penalty. Go fuck yourself noob.`)
            } else {
          const remainingCoins = await economy.addCoins(
          guild.id,
            member.id,
            coinsToSteal
          )
          const newBalance = await economy.addCoins(guild.id, target.id, coinsToSteal * -1)
      
          message.reply(
            `You just stole \`${coinsToSteal}\` OctaCreds from *<@${target.id}>* ! They now have \`${newBalance}\` OctaCreds and you have \`${remainingCoins}\` OctaCreds!`
          )
          }
        
        }) 
      }
    })
      
      
    

    
  },
}