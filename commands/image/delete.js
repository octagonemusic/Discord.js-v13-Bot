const canva = require('canvacord');
const Discord = require('discord.js')

module.exports = {
    name: "delete",
    description: "Delete yourself or the mentioned user",
    timeout: 5,
    usage: "<member>",
    run: async (client, message, args) => {

        const { member, mentions } = message

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        let xavatar = target.user.displayAvatarURL({ dynamic: false, format: "png" })


        let ximage = await canva.Canvas.delete(xavatar)

        let xtriggered = new Discord.MessageAttachment(ximage, "delete.png")


        message.reply({ files: [xtriggered] })
    }
}