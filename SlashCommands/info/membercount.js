const Discord = require('discord.js')
module.exports = {
    name : 'membercount',
    description: "Shows the total number of users in the server",
    run: (client, interaction, args) => {
        const { guild } = interaction
            const embed = new Discord.MessageEmbed()
                .setAuthor(guild.name)
                .setTitle('Member Count!')
                .setDescription(`**${guild.name}** has a total of \`${guild.memberCount}\` members.`)
                .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL())
                .setTimestamp()
                .setColor('RANDOM')
            interaction.editReply({embeds: [embed]})
        }
    }