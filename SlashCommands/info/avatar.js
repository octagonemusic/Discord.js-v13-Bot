const Discord = require('discord.js')
module.exports = {
    name : 'avatar',
    description : "Shows the enlarged version of your's or the mentioned member's profile picture",
    options: [
        {
            name: "user",
            description: "Mention the user whose avatar you want to retrieve",
            required: false,
            type: "USER"
        }
    ],
    run : (client, interaction, args) => {

        const [name] = args
        let member = client.users.cache.get(name)
        if(!name) member = interaction.user

        const embed = new Discord.MessageEmbed()
            .setAuthor(interaction.guild.name)
            .setTitle(`${member.tag}'s avatar:`)
            .setImage(member.displayAvatarURL({ dynamic: true, size: 256 }))
            .setColor("RANDOM")
            .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))

        interaction.followUp({embeds: [embed]})
    }
}