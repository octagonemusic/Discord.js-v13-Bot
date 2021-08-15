const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")

module.exports = {
    name: "rrinterests",
    description: "Reaction roles for interests.",
    usage: "<#channel>",
    run: async (client, message, args) => {

        const embed = new MessageEmbed()
            .setAuthor(message.guild.name)
            .setTitle("Interests!")
            .setDescription("Pick your Interest roles for interests!")
            .setColor("RANDOM")
            .setImage("https://media.giphy.com/media/Okzo9lDDlNZsJdTH04/giphy.gif")

        const music = new MessageButton()
            .setLabel(`🎶 Music`)
            .setStyle("PRIMARY")
            .setCustomId("music")

        const reading = new MessageButton()
            .setLabel(`📕 Reading`)
            .setStyle("PRIMARY")
            .setCustomId("reading")

        const art = new MessageButton()
            .setLabel("🎨 Art")
            .setStyle("PRIMARY")
            .setCustomId("art")

        const gaming = new MessageButton()
        .setLabel("🎮 Gaming")
        .setStyle("PRIMARY")
        .setCustomId("gaming")


        const interests = new MessageActionRow().addComponents(
            music, reading, art, gaming
        )

        const targetChannel = message.mentions.channels.first()

        if (message.member.permissions.has("ADMINISTRATOR")) {

            if (targetChannel) {
                targetChannel.send({
                    embeds: [embed],
                    components: [interests],
                })
            } else {
                message.reply("Mention the channel you want to send the embed in.")
            }
        } else {
            message.reply("You need to have the \`ADMINISTRATOR\` permission to run this command.")
        }

    }

}