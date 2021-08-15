const antiswearSchema = require('../../schemas/antiswear-schema');

module.exports = {
    name: 'antiswear-on',
    description: "Switches on the anti-swear feature",
    run: async(client, message, args) => {
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply('You do not have admin permission');

        const params = {
            Guild: message.guild.id
        }
       antiswearSchema.findOne(params, async(err, data) => {

            

           if(data){
            const enabled = data.Enabled === 1
            if(!enabled){
                data.Enabled = 1
                message.reply("Anti-Swear has successfully been turned \`on\`.")
            } else {
                message.reply("Anti-swear is already turned \`on\`.")
            }
            await antiswearSchema.findOneAndUpdate(params, data)

           } else {
                new antiswearSchema({
                    Guild: message.guild.id,
                    Enabled: 1,
                }).save()
                
                message.reply("Anti-Swear has successfully been turned \`on\`.")
           }

        })
    }
}