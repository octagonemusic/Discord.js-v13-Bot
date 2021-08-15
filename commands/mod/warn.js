const warnSchema = require('../../schemas/warn-schema')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name :'warn',
    timeout: 5,
    description: "Warns the mentioned user.",
    usage: "<member>",
    run : async(client, message, args) => {
        const { guild } = message
        const octagone = message.client.users.cache.get('717166815943327764')
        if(!message.member.permissions.has('KICK_MEMBERS')) return message.reply('You do not have permissions to use this command.')
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.reply('Please specify a user to warn.')
        if (user.id === octagone.id) return message.reply('go kys')
        const reason = args.slice(1).join(" ")
        if(!reason) return message.reply('Please specify a reason')
        warnSchema.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(!data) {
                data = new warnSchema({
                    guildid: message.guild.id,
                    user : user.user.id,
                    content : [
                        {
                            moderator : message.author.id,
                            reason : reason
                        }
                    ]
                })
            } else {
                const obj = {
                    moderator: message.author.id,
                    reason : reason
                }
                data.content.push(obj)
            }
            data.save()
        });
        user.send({embeds: [new MessageEmbed()
        .setAuthor(guild.name)
        .setTitle('Warned!')
        .setDescription(`You were warned in ${guild.name}`)
        .addFields(
            {
                name: `Reason`,
                value: reason
            }
        )
        .setColor('RED')]}
        )
        message.reply({embeds: [new MessageEmbed()
            .setAuthor(guild.name)
            .setTitle('Warned!')
            .setDescription(`Warned ${user}`)
            .addFields(
                {
                    name: `Reason`,
                    value: reason
                }
            )
            .setColor('BLUE')
            .setFooter(`Warn issued by ${message.author.tag}`)]}
        )
        guild.channels.cache.get('832524541883580426').send({embeds: [new MessageEmbed()
        .setAuthor(guild.name)
        .setTitle('Warned!')
        .setDescription(`${message.author.tag} warned ${user}`)
        .addFields(
            {
                name: `Reason`,
                value: reason
            }
        )
        .setColor('YELLOW')
        .setFooter(`Warn issued by ${message.author.tag}`)]}
    )
    }
}