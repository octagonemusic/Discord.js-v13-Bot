const antispamSchema = require('../../schemas/antispam-schema');

module.exports = {
    name: 'antispam-off',
    description: "Switches off the anti-spam feature",
    run: async(client, message, args) => {
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply('You do not have admin permission');

        const params = {
            guildId: message.guild.id
        }
       antispamSchema.findOne(params, async(err, data) => {

            

           if(data){
            const enabled = data.enabled === 1
            if(!enabled){
                message.reply("Anti-spam is already turned \`off\`.")
            } else {
                data.Enabled = 0
                message.reply("Anti-spam has been successfully turned \`off\`.")
            }
            await antispamSchema.findOneAndUpdate(params, data)

           } else {
            message.reply("Anti-spam is already turned \`off\`.")
           }
       })
    }
}