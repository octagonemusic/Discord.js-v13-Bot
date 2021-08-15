const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'kick',
    description: 'Kicks the mentioned member.',
    timeout: 5,
    usage: '<member>',
    run: async (client, message, args) => {

        const { guild } = message

        const prefix = "?"

        const reason = message.content.slice(prefix.length).trim().split(/ +/g)

        let rreason = args.slice(1).join(" ")
        if(!rreason) rreason = "No reason provided"


        if (!message.guild.me.permissions.has('KICK_MEMBERS')) return message.reply(
            {embeds: [new MessageEmbed()
                .setAuthor(guild.name)
                .setTitle('Error!')
                .setDescription('**I do not have permissions to kick members!**')
                .setColor('RED')
                .setTimestamp()]}
        )

        const Member = message.mentions.members.first()

        if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply(
            {embeds: [new MessageEmbed()
                .setAuthor(guild.name)
                .setTitle('Error!')
                .setDescription('**You do not have the permission to kick members.**')
                .setColor('RED')
                .setTimestamp()]}
        )



        if (!Member) return message.reply(
            {embeds: [new MessageEmbed()
                .setAuthor(guild.name)
                .setTitle('Error!')
                .setDescription('**Please specify someone to kick!**')
                .setColor('RED')
                .setTimestamp()]}
        )

        if (Member.permissions.has("KICK_MEMBERS")) return message.reply(
            {embeds: [new MessageEmbed()
                .setAuthor(guild.name)
                .setTitle('Error!')
                .setDescription('**You cannot kick Admins and Moderators!**')
                .setColor('RED')
                .setTimestamp()]}
        )



        await Member.kick([[...reason].splice(2).join(' ')])
        guild.channels.cache.get('832524541883580426').send({embeds: [new MessageEmbed()
            .setAuthor(guild.name)
            .setTitle('Kicked!')
            .setDescription(`**${Member.user.tag}** has been kicked.`)
            .addFields({
                name: `Reason`,
                value: rreason
            })
            .setColor('RED')
            .setFooter(`Kicked by ${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp()]})

        message.reply(
           {embeds: [new MessageEmbed()
                .setAuthor(guild.name)
                .setTitle('Kicked!')
                .setDescription(`**${Member.user.tag}** has been kicked.`)
                .addFields({
                    name: `Reason`,
                    value: rreason
                })
                .setColor('GREEN')
                .setFooter(`Kicked by ${message.author.username}`, message.author.displayAvatarURL())
                .setTimestamp()]}
        )
    }
}