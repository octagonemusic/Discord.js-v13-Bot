const Discord = require('discord.js')

module.exports = {
    name: "howgay",
    aliases: ["gayrate"],
    description: "Shows how gay you are",
    usage: "<member>",

    run: async (client, message, args) => {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member

        let rng = Math.floor(Math.random() * 101);

        const howgayembed = new Discord.MessageEmbed()
        .setAuthor(message.guild.name)
        .setTitle(`Gay Machine Calculator`)
        .setDescription(`${member.user.tag} is ` + rng + "% Gay🌈")
        .setColor("GREEN")

        message.reply({embeds: [howgayembed]});
    }
}