const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")

module.exports = {
    name: "rrinstruments",
    description: "Reaction roles for instruments.",
    usage: "<#channel>",
    run: async (client, message, args) => {

        const embed = new MessageEmbed()
            .setAuthor(message.guild.name)
            .setTitle("Instruments!")
            .setDescription("Pick your Instrument roles according to the instrument you play!")
            .setColor("RANDOM")
            .setImage("https://media.giphy.com/media/hI7xMa7RTQUEnwSgi8/giphy.gif")

        const piano = new MessageButton()
            .setLabel(`🎹 Piano`)
            .setStyle("PRIMARY")
            .setCustomId("piano")

        const guitar = new MessageButton()
            .setLabel(`🎸 Guitar`)
            .setStyle("PRIMARY")
            .setCustomId("guitar")

        const violin = new MessageButton()
            .setLabel("🎻 Violin")
            .setStyle("PRIMARY")
            .setCustomId("violin")

        const singing = new MessageButton()
        .setLabel("🎤 Singing")
        .setStyle("PRIMARY")
        .setCustomId("singing")

        const drums = new MessageButton()
        .setLabel("🥁 Drums")
        .setStyle("PRIMARY")
        .setCustomId("drums")

        const others = new MessageButton()
        .setLabel("📻 Other Instruments")
        .setStyle("PRIMARY")
        .setCustomId("others")


        const instruments1 = new MessageActionRow().addComponents(
            piano, guitar, violin, singing
        )

        const instruments2 = new MessageActionRow().addComponents(
            drums, others
        )

        const targetChannel = message.mentions.channels.first()

        if (message.member.permissions.has("ADMINISTRATOR")) {

            if (targetChannel) {
                targetChannel.send({
                    embeds: [embed],
                    components: [instruments1, instruments2],
                })
            } else {
                message.reply("Mention the channel you want to send the embed in.")
            }
        } else {
            message.reply("You need to have the \`ADMINISTRATOR\` permission to run this command.")
        }

    }

}