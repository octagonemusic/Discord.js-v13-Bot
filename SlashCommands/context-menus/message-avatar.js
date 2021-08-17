const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "Get-Avatar",
    type: "USER",
    run: async(client, interaction, args) => {

        const user = await client.users.fetch(interaction.targetId)

        const embed = new MessageEmbed()
            .setAuthor(interaction.guild.name)
            .setTitle(`${user.tag}'s avatar:`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 256 }))
            .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))

        interaction.followUp({ embeds: [embed] })
    }
}