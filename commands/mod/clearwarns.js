const warnSchema = require('../../schemas/warn-schema')

module.exports = {
    name: 'clearwarns',
    aliases: ['cw', 'clw'],
    timeout: 5,
    description: "Clears all the warnings of the mentioned user.",
    usage: "<member>",
    run: async (client, message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply('You do not have permission to use this command.')
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.reply('Please mention a user to clear warnings for.')
        warnSchema.findOne({ guildid: message.guild.id, user: user.user.id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                await warnSchema.findOneAndDelete({ user: user.user.id, guildid: message.guild.id })
                message.reply(`Cleared ${user.user.tag}'s warns`)
            } else {
                message.reply('This user does not have any warns in this server!')
            }
        })
    }
}