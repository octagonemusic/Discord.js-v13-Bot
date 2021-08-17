const antiswearSchema = require('../../schemas/antiswear-schema');

module.exports = {
    name: 'antiswear-off',
    description: "Switches off the anti-swear feature",
    run: async(client, message, args) => {
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply('You do not have admin permission');

        const params = {
            Guild: message.guild.id
        }
       antiswearSchema.findOne(params, async(err, data) => {

            

           if(data){
            const enabled = data.Enabled === 1
            if(!enabled){
                message.reply("Anti-Swear is already turned \`off\`.")
            } else {
                data.Enabled = 0
                message.reply("Anti-Swear has been successfully turned \`off\`.")
            }
            await antiswearSchema.findOneAndUpdate(params, data)

           } else {
            message.reply("Anti-Swear is already turned \`off\`.")
           }
       })
    }
}