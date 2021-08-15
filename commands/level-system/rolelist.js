const Discord = require('discord.js')
module.exports = {
    name: 'rolelist',
    description: 'Shows the list of leveled roles in this server.',
    timeout: 5,
    run: (client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${message.guild.name}`)
        .setTitle(`Leveled Roles list for ${message.guild.name}!`)
        .setFooter('Chat more to earn more XP and new Levels!')
        .setColor('#D400FF')
        .setDescription(`\`[1]\` **| Ionian** \`Level 5\`
\`[2]\` **| Dorian** \`Level 10\`
\`[3]\` **| Phrygian** \`Level 17\`
\`[4]\` **| Lydian** \`Level 22\`
\`[5]\` **| Mixolydian** \`Level 30\`
\`[6]\` **| Aeolian** \`Level 35\`
\`[7]\` **| Locrian** \`Level 44\``)

message.reply({embeds: [embed]})
    }
}