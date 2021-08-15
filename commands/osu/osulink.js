const osuSchema = require('../../schemas/osu-schema')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "osulink",
    aliases: ["osuset"],
    description: "Links your osu! account with the bot.",
    usage: "<osu! username>",
    run: async(client, message, args) => {
        const user = args.join(' ')

        if(!user) return message.reply("Please specify your osu! username.")

        await osuSchema.findOne({userId: message.author.id}, async(err, data) => {
            if(!data) {
                new osuSchema({
                    userId: message.author.id,
                    osuuser: user,
                }).save()
                message.reply(`**Your osu! account has successfully been linked with this bot!**\n\n**Username of the linked osu! account:** \`${user}\``)
            } else {
                

                message.reply(`An account has already been linked with this bot. Please use \`!osudelete\` to delete the linked account and then use \`!osuset\` to link your account again.`)
            }
        })
    }
}