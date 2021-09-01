const { MessageEmbed } = require("discord.js");
const solenolyrics= require("solenolyrics"); 

module.exports = {
    name: 'lyrics',
    run: async(client, message, args) => {

        if(!args.length) return message.reply("Please specify a song.")
        
        try {
            const lyrics = await solenolyrics.requestLyricsFor(args.join(" ")); 
        return message.reply({embeds: [
            new MessageEmbed()
                .setAuthor(message.guild.name)
                .setTitle(`Lyrics for ${args.join(" ")}`)
                .setDescription(lyrics)
                .setColor("RANDOM")
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        ]})
    } catch (err) {
        message.reply("Lyrics for the specified song was not found.")
    }
    }
}