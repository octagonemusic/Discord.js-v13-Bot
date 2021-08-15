module.exports = {
    name: 'report',
    usage: '<member> <reason>',
    description: "Reports the mentioned user to the staff.",
    timeout: 5,
    run: (client, message, arguments) => {
        const prefix = '!'
        const { guild, member, mentions } = message
        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const target = mentions.members.first()
        const reason = `${[...arguments].splice(1).join(' ')}`

        if (!target) {
            message.reply(`👎 **| Mention a user to report.**`)
        } else if (!reason) {
            message.reply(`👎 **| Mention the reason of your report.**`)
        } else {
            message.reply(`👍 **| ${target.user.tag} has been reported.**`)
            guild.channels.cache.get('832632526420836374').send(`***${message.author.tag}* reported *${target.user.tag}***.

 __**Reason**__: *${reason}*`)
        }
    }
}