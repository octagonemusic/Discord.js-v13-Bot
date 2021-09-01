
const osuSchema = require('../../schemas/osu-schema')

module.exports = {
    name: "osudelete",
    aliases: ["osudel"],
    description: "Deletes the currently linked osu! account from the bot.",
    run: async(client, message, args) => {
        await osuSchema.findOne({ userId: message.author.id }, async(err, data) => {
            if(data) {
                data.delete()
                message.reply("Your osu! account has successfully been unlinked from the bot!")
            } else {
                message.reply("You do not have any osu! account linked with the bot!")
            }
        })
    }
}