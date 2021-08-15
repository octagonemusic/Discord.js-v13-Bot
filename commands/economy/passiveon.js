const Discord = require('discord.js')
const profileSchema = require('../../schemas/profile-schema')
const items = require('../../utils/shopitems')
const economy = require('../../utils/economy')

module.exports = {
    name: 'passiveon',
  description: "Switches on passive mode.",
  timeout: 86400000,
  run: async(client, message, args) => {

        const { guild, member } = message
        




        
        const params = {
            guildId: guild.id,
            userId: member.id
        } 
        profileSchema.findOne(params, async(err, data) => {
            if(data) {
                const hasItem = data.Passive === 1
                if(!hasItem) {
                    data.Passive = 1
                    message.reply(`You have successfullly set your mode to Passive!`)
                } else {
                    message.reply(`You are already in passive mode!`)
                }
                console.log(data)
                await profileSchema.findOneAndUpdate(params, data)
            } else if(!data){
                new profileSchema({
                    guildId: guild.id,
                    userId: member.id,
                    Passive: 1,
                    
                }).save()
                message.reply(`You have successfullly set your mode to Passive!`)
            }
            
            
        })
    }
}