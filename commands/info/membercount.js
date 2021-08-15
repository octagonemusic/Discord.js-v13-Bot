const Discord = require('discord.js')
module.exports = {
    name : 'membercount',
    aliases: ['members'],
    description: "Shows the total number of users in the server",
    timeout: 5,
    run: (client, message, args) => {
        const { guild } = message
            const embed = new Discord.MessageEmbed()
                .setAuthor(guild.name)
                .setTitle('Member Count!')
                .setDescription(`**${guild.name}** has a total of \`${guild.memberCount}\` members.`)
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
                .setTimestamp()
                .setColor('RANDOM')
            message.reply({embeds: [embed]})
        }
    }