const canva = require('canvacord');
const Discord = require('discord.js')

module.exports = {
    name: "wanted",
    description: "Puts up a wanted poster for you or the mentioned user.",
    timeout: 5,
    usage: "<member>",

    run: async(client, message, args) => {

            const { member, mentions } = message

                const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
              let xavatar = target.user.displayAvatarURL({dynamic: false, format: "png"})

        
                let ximage = await canva.Canvas.wanted(xavatar)

                let xtriggered = new Discord.MessageAttachment(ximage, "twanted.png")

          
                    message.reply({files: [xtriggered]})
    }
}