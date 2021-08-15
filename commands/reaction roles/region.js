const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")

module.exports = {
    name: "rrregions",
    description: "Reaction roles for region.",
    usage: "<#channel>",
    run: async (client, message, args) => {

        const embed = new MessageEmbed()
            .setAuthor(message.guild.name)
            .setTitle("Region!")
            .setDescription("Pick your Region roles according to the region you're from!")
            .setColor("RANDOM")
            .setImage("https://media.giphy.com/media/74bHMD7bFCjHw5e1Oz/giphy.gif")

        const asia = new MessageButton()
            .setLabel(`🍜 Asia`)
            .setStyle("PRIMARY")
            .setCustomId("asia")

        const europe = new MessageButton()
            .setLabel(`🍕 Europe`)
            .setStyle("PRIMARY")
            .setCustomId("europe")

        const northamerica = new MessageButton()
            .setLabel("🍔 North America")
            .setStyle("PRIMARY")
            .setCustomId("NA")

        const southamerica = new MessageButton()
        .setLabel("🌮 South America")
        .setStyle("PRIMARY")
        .setCustomId("SA")

        const africa = new MessageButton()
        .setLabel("🍖 Africa")
        .setStyle("PRIMARY")
        .setCustomId("africa")

        const oceania = new MessageButton()
        .setLabel("🦘 Oceania")
        .setStyle("PRIMARY")
        .setCustomId("oceania")


        const region1 = new MessageActionRow().addComponents(
            asia, europe, northamerica, southamerica
        )

        const region2 = new MessageActionRow().addComponents(
            africa, oceania
        )

        const targetChannel = message.mentions.channels.first()

        if (message.member.permissions.has("ADMINISTRATOR")) {

            if (targetChannel) {
                targetChannel.send({
                    embeds: [embed],
                    components: [region1, region2],
                })
            } else {
                message.reply("Mention the channel you want to send the embed in.")
            }
        } else {
            message.reply("You need to have the \`ADMINISTRATOR\` permission to run this command.")
        }

    }

}