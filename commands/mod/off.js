const { MessageEmbed } = require('discord.js')
const onoffSchema = require('../../schemas/onoff-schema')

module.exports = {
    name: "off",
    description: "Turns off the user.",
    run: async(client, message, args) => {
        const { guild, member } = message
        const role = message.guild.roles.cache.get('857686987749588992')
        if(!message.member.permissions.has("KICK_MEMBERS")) return message.reply("You do not have permission to on/off members.")
        const target = message.mentions.members.first()
        if(!target) return message.reply('Please mention a user to turn off.')
        if(target.permissions.has("KICK_MEMBERS")) return message.reply(
            {embeds: [new MessageEmbed()
            .setAuthor(guild.name)
            .setTitle('Error!')
            .setDescription('You cannot on/off Admins/Moderators.')
            .setTimestamp()]}
        )

        const params = {
            guildId: guild.id,
            userId: target.user.id
        } 
        onoffSchema.findOne(params, async(err, data) => {
            if(data) {
                const hasOff = data.off === 1
                if(!hasOff) {
                    target.roles.add(role)
                    data.off = 1
                    message.reply(`That user has been turned off!`)
                } else {
                    message.reply(`That user is already turned off!`)
                }
                console.log(data)
                await onoffSchema.findOneAndUpdate(params, data)
            } else if(!data){
                
                new onoffSchema({
                    guildId: guild.id,
                    userId: target.user.id,
                    off: 1,
                    
                }).save()
                target.roles.add(role)
                message.reply(`That user has been turned off!`)
            }
            
            
        })
        


    }
}