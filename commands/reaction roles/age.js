const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")

module.exports = {
    name: "rrage",
    description: "Reaction roles for age.",
    usage: "<#channel>",
    run: async (client, message, args) => {

        const embed = new MessageEmbed()
            .setAuthor(message.guild.name)
            .setTitle("Age!")
            .setDescription("Pick your age roles according to your age!")
            .setColor("RANDOM")
            .setImage("https://media.giphy.com/media/gf7QmHvHMiyWYv6Ck6/giphy.gif")

        const below18 = new MessageButton()
            .setLabel(`👦 Below 18`)
            .setStyle("PRIMARY")
            .setCustomId("below18")

        const above18 = new MessageButton()
            .setLabel(`👨 Above 18`)
            .setStyle("PRIMARY")
            .setCustomId("above18")

        const row = new MessageActionRow().addComponents(
            below18, above18
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