const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "Author Avatar",
    type: "MESSAGE",
    run: async(client, interaction, args) => {

        const msg = await interaction.channel.messages.fetch(interaction.targetId)

        const embed = new MessageEmbed()
            .setAuthor(interaction.guild.name)
            .setTitle(`${msg.author.tag}'s avatar:`)
            .setImage(msg.author.displayAvatarURL({ dynamic: true, size: 256 }))
            .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))

        interaction.followUp({ embeds: [embed] })
    }
}