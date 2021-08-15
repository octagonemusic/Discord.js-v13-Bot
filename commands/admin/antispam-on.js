const antispamSchema = require("../../schemas/antispam-schema")

module.exports = {
    name: "antispam-on",
    description: "Switches on the anti-spam feature",
    run: async(client, message, args) => {
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply("You need the \`ADMINISTRATOR\` permission to run this command.")

        antispamSchema.findOne({ guildId: message.guild.id }, async(err, data) => {
            if(data) {
                if(data.enabled === 1) {
                    return message.reply("Anti-Spam is already turned \`on\`!")
                } else {
                    data.enabled = 1
                    message.reply("Anti-Spam has successfully been turned \`on\`!")
                }
            } else {
                new antispamSchema({
                    guildId: message.guild.id,
                    enabled: 1
                }).save()

                message.reply("Anti-Spam has successfully been turned \`on\`!")
            }
        })
    }
}