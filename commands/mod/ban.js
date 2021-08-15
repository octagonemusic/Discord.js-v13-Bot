const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'ban',
    description: 'Bans the mentioned member.',
    timeout: 5,
    usage: '<member>',
    run: async (client, message, args) => {

        const { guild } = message

        const prefix = "!"

        let rreason = args.slice(1).join(" ")
        if(!rreason) rreason = "No reason provided."


        if (!message.guild.me.permissions.has('BAN_MEMBERS')) return message.reply(
           {embeds: [ new MessageEmbed()
                .setAuthor(guild.name)
                .setTitle('Error!')
                .setDescription('**I do not have permissions to ban members!**')
                .setColor('RED')
                .setTimestamp()]}
        )

        const Member = message.mentions.members.first()

        if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply(
            {embeds: [new MessageEmbed()
                .setAuthor(guild.name)
                .setTitle(' Error!')
                .setDescription('**You do not have the permission to ban members.**')
                .setColor('RED')
                .setTimestamp()]}
        )



        if (!Member) return message.reply(
           {embeds: [ new MessageEmbed()
                .setAuthor(guild.name)
                .setTitle('Error!')
                .setDescription('**Please specify someone to ban!**')
                .setColor('RED')
                .setTimestamp()]}
        )

        if (Member.permissions.has("KICK_MEMBERS")) return message.reply(
            {embeds: [new MessageEmbed()
                .setAuthor(guild.name)
                .setTitle('Error!')
                .setDescription('**You cannot ban Admins and Moderators!**')
                .setColor('RED')
                .setTimestamp()]}
        )



        await Member.ban({ reason: [...args].splice(1).join(' ') })
        guild.channels.cache.get('832524541883580426').send({embeds: [new MessageEmbed()
            .setAuthor(guild.name)
            .setTitle('Banned!')
            .setDescription(`**${Member.user.tag}** has been banned.`)
            .addFields(
                {
                    name: `Reason`,
                    value: rreason
                }
            )
            .setColor('RED')
            .setFooter(`Banned by ${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp()]})

        message.reply(
            {embeds: [new MessageEmbed()
            .setAuthor(guild.name)
            .setTitle('Banned!')
            .setDescription(`**${Member.user.tag}** has been banned.`)
            .addFields(
                {
                    name: `Reason`,
                    value: rreason
                }
            )
            .setColor('GREEN')
            .setFooter(`Banned by ${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp()]}
        )
    }
}