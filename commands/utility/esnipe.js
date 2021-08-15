const { MessageEmbed }  = require('discord.js')
const moment = require('moment')

module.exports = {
    name: 'editsnipe',
    aliases: ['esnipe'],
    description: "Shows the recently edited messages.",
    usage: '<number>',
    timeout: 5,
    run: (client, message, args) => {
        const esnipes = client.esnipes.get(message.channel.id)
        if(!esnipes) return message.reply("There is nothing to snipe!")

        const esnipe = +args[0] - 1 || 0
        const target = esnipes[esnipe]
        if(!target) return message.reply(`**There are only \`${esnipes.length}\` messages!**`);

        const { oldmsg, newmsg, image, time } = target
        message.reply(
            {embeds: [new MessageEmbed()
            .setAuthor(oldmsg.author.tag, oldmsg.author.displayAvatarURL())
            .addFields(
                {
                    name: `Old Message`,
                    value: oldmsg.content.substring(0,900) || "No text message."
                }, 
                {
                    name: `New Message`,
                    value: newmsg.content.substring(0,900) || "No text message."
                }
            )
            .setImage(image)
            .setColor("RANDOM")
            .setFooter(`${moment(time).fromNow()} | ${esnipe + 1} / ${esnipes.length}`)]}
        );
    }
}