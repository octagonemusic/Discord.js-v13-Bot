const Discord = require('discord.js')

module.exports = {
    name: 'boosters',
    description: "Shows the list of boosters.",
    run: (client, message, args) => {

        let role = message.guild.roles.cache.find(role => role.name.toLowerCase() === "booster") 
        let boosters = role.members.map(m=>m.user)
        
        const lb = boosters.map((v, i) => {
            return `**\`[${i + 1}]\` |** **${message.client.users.cache.get(v.id).tag}**`;
        })
        let embed = new Discord.MessageEmbed()
        .setTitle('Boosters!')
        .setAuthor(message.guild.name)
        .setThumbnail('https://emoji.gg/assets/emoji/6494-discord-boost.gif')
        .setDescription(lb.join("\n\n"))
        .setFooter('Boost now to join this list!')

        message.reply({embeds: [embed]})
    }
}