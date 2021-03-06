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
        const msg = await interaction.followUp(`š Pinging...`)
        const embed = new MessageEmbed()
            .setAuthor(guild.name)
            .setTitle('Pong!')
            .setDescription(`**š API Latency:** \`${client.ws.ping}ms\`\n\nš **Bot Latency:** \`${Math.floor(msg.createdAt - interaction.createdAt)}ms\``)
            .setFooter(`Ping requested by ${interaction.user.username}`, interaction.user.displayAvatarURL({ dynamic: true }))
            .setColor("RANDOM")
            msg.edit({content: '_ _', embeds: [embed]})

    },
};
