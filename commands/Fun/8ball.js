const Discord = require('discord.js')

module.exports = {
    name: "8ball",
    aliases: ["8b"],
    description: "8ball command",
    usage: "<question>",

    run: async(client, message, args) => {
        if(!args[0]) return message.reply('Please ask a full question!')
        let replies = ["Yes.", "Of course.", "Yes – definitely.", "No.", "Better not tell you now.", "nah", "never", "Cannot predict now.", "I dont know.", "I dont know *yet*...", "Not a chance.", "I think so.", "Only for today!", "Not for today", "Sadly yes..", "Sadly no..", "Maybe!", "Ask again later."];
        
        let result = Math.floor((Math.random() * replies.length));
        let question = args.slice().join(" ");

        let ballembed = new Discord.MessageEmbed()
        .setAuthor(`🎱 ${message.author.username}`)
        .setColor("#1C1C1C")
        .addField("Question", question)
        .addField("Answer", replies[result])

        message.reply({embeds: [ballembed]})
    }
}