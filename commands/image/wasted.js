const canva = require('canvacord');
const Discord = require('discord.js')

module.exports = {
    name: "wasted",
    description: "Waste yourself or the mentioned user.",
    timeout: 5,
    usage: "<member>",
    run: async(client, message, args) => {

            const { member, mentions } = message

                const target = message.mentions.members.first() || message.member
              let xavatar = target.user.displayAvatarURL({dynamic: false, format: "png"})

        
                let ximage = await canva.Canvas.wasted(xavatar)

                let xtriggered = new Discord.MessageAttachment(ximage, "wasted.png")

          
                    message.reply({files: [xtriggered]})
    }
}