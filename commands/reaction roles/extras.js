const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")

module.exports = {
    name: "rrextras",
    description: "Reaction roles for gender.",
    usage: "<#channel>",
    run: async (client, message, args) => {

        const embed = new MessageEmbed()
            .setAuthor(message.guild.name)
            .setTitle("Extras!")
            .setDescription("Pick your Ping roles and other roles here!")
            .setColor("RANDOM")
            .setImage("https://media.giphy.com/media/AJNX1SVVs57tTvs3RS/giphy.gif")

        const livestreamping = new MessageButton()
            .setLabel(`🔴 Live-Stream Ping`)
            .setStyle("PRIMARY")
            .setCustomId("livestreamping")

        const deadchatping = new MessageButton()
            .setLabel(`💀 Dead-Chat Ping`)
            .setStyle("PRIMARY")
            .setCustomId("deadchatping")

        const movienightping = new MessageButton()
            .setLabel("🎥 Movie-Night Ping")
            .setStyle("PRIMARY")
            .setCustomId("movienightping")

        const row = new MessageActionRow().addComponents(
            livestreamping, deadchatping, movienightping
        )

        const targetChannel = message.mentions.channels.first()

        if (message.member.permissions.has("ADMINISTRATOR")) {

            if (targetChannel) {
                targetChannel.send({
                    embeds: [embed],
                    components: [row]
                })
            } else {
                message.reply("Mention the channel you want to send the embed in.")
            }
        } else {
            message.reply("You need to have the \`ADMINISTRATOR\` permission to run this command.")
        }

    }

}