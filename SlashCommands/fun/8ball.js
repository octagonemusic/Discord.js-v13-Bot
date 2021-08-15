const Discord = require('discord.js')

module.exports = {
    name: "8ball",
    description: "8ball command",
    options: [
        {
            name: "question",
            description: "Specify your question!",
            type: "STRING",
            required: true
        }
    ],

    run: async(client, interaction, args) => {

        const [question] = args
        let replies = ["Yes.", "Of course.", "Yes – definitely.", "No.", "Better not tell you now.", "nah", "never", "Cannot predict now.", "I dont know.", "I dont know *yet*...", "Not a chance.", "I think so.", "Only for today!", "Not for today", "Sadly yes..", "Sadly no..", "Maybe!", "Ask again later."];
        
        let result = Math.floor((Math.random() * replies.length));

        let ballembed = new Discord.MessageEmbed()
        .setAuthor(`🎱 ${interaction.user.username}`)
        .setColor("#1C1C1C")
        .addField("Question", question)
        .addField("Answer", replies[result])

        interaction.editReply({embeds: [ballembed]})
    }
}