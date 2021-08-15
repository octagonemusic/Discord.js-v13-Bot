const { MessageEmbed }  = require('discord.js')
const moment = require('moment')

module.exports = {
    name: 'snipe',
    description: "Shows the recently deleted messages.",
    usage: '<number>',
    timeout: 5,
    run: (client, message, args) => {
        const snipes = client.snipes.get(message.channel.id)
        if(!snipes) return message.reply("There is nothing to snipe!")

        const snipe = +args[0] - 1 || 0
        const target = snipes[snipe]
        if(!target) return message.reply(`**There are only \`${snipes.length}\` messages!**`);

        const { msg, image, time } = target
        message.reply(
            {embeds: [new MessageEmbed()
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
            .setDescription(msg.content.substring(0, 900) || "No text content")
            .setImage(image)
            .setColor("RANDOM")
            .setFooter(`${moment(time).fromNow()} | ${snipe + 1} / ${snipes.length}`)]}
        );
    }
}