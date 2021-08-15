const Discord = require('discord.js')
const profileSchema = require('../../schemas/profile-schema')
const items = require('../../utils/shopitems')
const economy = require('../../utils/economy')

module.exports = {
    name: 'passiveoff',
    description: "Switches off passive mode.",
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
                    message.reply(`You are not in passive mode!`)
                } else {
                    message.reply(`You have successfullly switched off Passive mode!`)
                    data.Passive = 0
                }
                console.log(data)
                await profileSchema.findOneAndUpdate(params, data)
            } else if(!data){
                message.reply(`You are not in passive mode!`)
            }
            
            
        })
    }
}