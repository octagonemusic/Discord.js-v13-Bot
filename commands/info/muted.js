const Discord = require('discord.js')

module.exports = {
    name: 'muted',
    description: "Shows the list of muted members.",
    run: (client, message, args) => {

        let muted = message.guild.roles.cache.find(role => role.name.toLowerCase() === "muted").members.map(m=>m.user)
        if(muted.length < 1) {
            const noMuted = new Discord.MessageEmbed()
            .setTitle('Muted Members!')
        .setThumbnail('https://emoji.gg/assets/emoji/6835_mute.png')
        .setDescription("No muted members!")
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
        message.reply({embeds: [noMuted]})
        } else {
            const lb = muted.map((v, i) => {
                return `**\`[${i + 1}]\` |** **${message.client.users.cache.get(v.id).tag}**`;
            })
            let embed = new Discord.MessageEmbed()
            .setTitle('Muted Members!')
            .setThumbnail('https://emoji.gg/assets/emoji/6835_mute.png')
            .setDescription(lb.join("\n\n"))
            .setFooter(`Requested by ${message.author.tag}`)
    
            message.reply({embeds: [embed]})
        }
        }
        
    }
