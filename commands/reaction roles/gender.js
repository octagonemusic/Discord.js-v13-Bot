const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")

module.exports = {
    name: "rrgender",
    description: "Reaction roles for gender.",
    usage: "<#channel>",
    run: async (client, message, args) => {

        const embed = new MessageEmbed()
            .setAuthor(message.guild.name)
            .setTitle("Gender!")
            .setDescription("Pick your Gender roles according to your gender!")
            .setColor("RANDOM")
            .setImage("https://media.giphy.com/media/1JoWtbvUQyQYnJ6fXH/giphy.gif")

        const male = new MessageButton()
            .setLabel(`🚹 Male`)
            .setStyle("PRIMARY")
            .setCustomId("male")

        const female = new MessageButton()
            .setLabel(`🚺 Female`)
            .setStyle("PRIMARY")
            .setCustomId("female")

        const transgender = new MessageButton()
            .setLabel("🏳‍🌈 Non-Binary")
            .setStyle("PRIMARY")
            .setCustomId("transgender")

        const row = new MessageActionRow().addComponents(
            male, female, transgender
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