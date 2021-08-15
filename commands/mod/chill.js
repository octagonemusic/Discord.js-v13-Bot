const Discord = require('discord.js')

module.exports = {
	name: 'chill',
	description: 'Locks the channel the command is used in.',
	timeout: 5,
	aliases: ["lock"],
	run: async (client, message, args) => {
		if (!message.member.permissions.has("KICK_MEMBERS")) {
			const embed = new Discord.MessageEmbed()
				.setAuthor(message.guild.name)
				.setTitle('Error')
				.setDescription('**You do not have the permission to chill channels.**')
				.setColor('RANDOM')
				.setTimestamp()
			message.reply({embeds: [embed]})
		} else {

			const role = message.guild.roles.cache.get('832467028802797578');
			let lockChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
			if (!lockChannel) lockChannel = message.channel;

			await lockChannel.permissionOverwrites.edit(role, {
				SEND_MESSAGES: false
			}).catch(err => console.log(err));
			const rembed = new Discord.MessageEmbed()
				.setAuthor(message.guild.name)
				.setTitle('Chilled!')
				.setDescription(`**This channel has been successfully chilled!**`)
				.setColor('RANDOM')
				.setFooter(`Chilled by ${message.author.username}`, message.author.displayAvatarURL())
				.setTimestamp()
			message.reply({embeds: [rembed]})
		}
	}
}