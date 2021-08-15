const { MessageEmbed } = require('discord.js')
module.exports = {
    name : 'ping',
    category : 'Utility / Info',
    timeout: 5,
    description : 'Returns latency and API ping',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
        const { guild } = message
        const msg = await message.reply(`🏓 Pinging...`)
        const embed = new MessageEmbed()
            .setAuthor(guild.name)
            .setTitle('Pong!')
            .setDescription(`**🏓 API Latency:** \`${client.ws.ping}ms\`\n\n🏓 **Bot Latency:** \`${Math.floor(msg.createdAt - message.createdAt)}ms\``)
            .setFooter(`Ping requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setColor("RANDOM")
            await message.reply({embeds: [embed]})
            msg.delete()

    }
}