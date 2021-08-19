const warnSchema = require('../../schemas/warn-schema')
const { Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'listwarns',
    /**
     * @param {Message} message
     */
    description: "Shows the list of warns for the mentioned user.",
    usage: "<member>",
    timeout: 5,
    aliases: ["lw"],
    run: async (client, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!user) return message.reply('Please mention a user.')
        warnSchema.findOne({ guildid: message.guild.id, user: user.user.id }, async (err, data) => {
            if (err) console.log(err)
            if (data) {
                message.reply({
                    embeds: [new MessageEmbed()
                        .setTitle(`${user.user.tag}'s warns`)
                        .setDescription(
                            `${data.content.map(
                                (w, i) =>
                                    `\`${i + 1}\` | **Moderator:** ${message.guild.members.cache.get(w.moderator).user.tag}\n**Reason:** ${w.reason}\n\n`
                            )}`
                        )
                        .setColor("BLUE")]
                }
                )
                console.log(data.content.map(
                    (w, i) =>
                        `\`${i + 1}\` | **__Moderator__:** \`${(w.moderator)}\`\n   **__Reason__:** \`${w.reason}\`\n`
                ))
            } else {
                message.reply('User has no data')
            }

        })
    }
}