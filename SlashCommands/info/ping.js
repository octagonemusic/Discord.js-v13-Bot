const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "returns websocket ping",

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const { guild } = interaction
        const msg = await interaction.followUp(`🏓 Pinging...`)
        const embed = new MessageEmbed()
            .setAuthor(guild.name)
            .setTitle('Pong!')
            .setDescription(`**🏓 API Latency:** \`${client.ws.ping}ms\`\n\n🏓 **Bot Latency:** \`${Math.floor(msg.createdAt - interaction.createdAt)}ms\``)
            .setFooter(`Ping requested by ${interaction.user.username}`, interaction.user.displayAvatarURL({ dynamic: true }))
            .setColor("RANDOM")
            msg.edit({content: '_ _', embeds: [embed]})

    },
};
