const Discord = require('discord.js')
module.exports = {
  name: 'thaw',
  aliases: ['unlock'],
  description: "Locks the channel the command is used in.",
  timeout: 5,
  run: async(client, message, args) => {
    if (!message.member.permissions.has("KICK_MEMBERS")){ 
		const embed = new Discord.MessageEmbed()
					.setAuthor(message.guild.name)
						.setTitle('Error!')
						.setDescription('**You do not have the permission to thaw channels.**')
						.setColor('RANDOM')
						.setTimestamp()
              message.reply({embeds: [embed]})
		} else {
    const role = message.guild.roles.cache.get('832467028802797578');
    let unlockChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if(!unlockChannel) unlockChannel = message.channel;

    await unlockChannel.permissionOverwrites.edit(role, {
      SEND_MESSAGES: true
    }).catch(err => console.log(err));
    const rembed = new Discord.MessageEmbed()
						.setAuthor(message.guild.name)
						.setTitle('Thawed!')
						.setDescription(`**This channel has been thawed!**`)
						.setColor('RANDOM')
						.setFooter(`Thawed by ${message.author.username}`, message.author.displayAvatarURL())
						.setTimestamp()
            message.reply({embeds: [rembed]})
  }
	}
}