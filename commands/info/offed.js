const { MessageEmbed, Collection } = require('discord.js')

module.exports = {
    name: "offed",
    description: "Shows the list of offed users.",
    run: async (client, message, args) => {

        let boosters = message.guild.roles.cache.get('857686987749588992').members.map(m => m.user)
        if (boosters.length < 1) {
            const noMuted = new Discord.MessageEmbed()
                .setTitle('Offed Members!')
                .setThumbnail('https://emoji.gg/assets/emoji/9437-anime-shut-up.png')
                .setDescription("No offed members!")
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            message.reply({ embeds: [noMuted] })
        } else {
            const lb = boosters.map((v, i) => {
                return `**\`[${i + 1}]\` |** **${message.client.users.cache.get(v.id).tag}**`;
            })
            let embed = new MessageEmbed()
                .setTitle('Offed Members!')
                .setThumbnail('https://emoji.gg/assets/emoji/9437-anime-shut-up.png')
                .setDescription(lb.join("\n\n"))

            message.reply({embeds: [embed]})


        }
    }
}