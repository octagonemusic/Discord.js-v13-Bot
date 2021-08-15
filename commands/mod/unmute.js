const Discord = require('discord.js')
const Schema = require('../../schemas/mute-schema')

module.exports = {
    name: 'unmute',
	description: 'Unmutes the mentioned user.',
	usage: '<member>',
	timeout: 5, 
    run: async(client, message, args) => {
		const { guild } = message
			const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
			const role = guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

			if (!message.member.permissions.has('MANAGE_MESSAGES')) {
				const embed = new Discord.MessageEmbed()
					.setAuthor(guild.name)
						.setTitle('Error!')
						.setDescription('**You do not have the permission to unmute members.**')
						.setColor('RANDOM')
						.setTimestamp()
              message.reply({embeds: [embed]})
			} else if(!Member) {
				const rembed = new Discord.MessageEmbed()
						.setAuthor(guild.name)
						.setTitle('Error!')
						.setDescription('**Please specify someone to unmute.**')
						.setColor('RANDOM')
						.setTimestamp()
              message.reply({embeds: [rembed]})
			} else {
        
				
    await Schema.findOne({
					Guild: message.guild.id, 
				}, 
				async(err, data) => {
					const user = data.Users.findIndex((prop) => prop === Member.id)
					if(!data) { 
					const rrembed = new Discord.MessageEmbed()
						.setAuthor(guild.name)
						.setTitle('Error!')
						.setDescription(`**${Member.user.tag} is not muted.**`)
						.setColor('RANDOM')
						.setTimestamp()
              message.reply({embeds: [rrembed]})
				
					} else 	
					
					if (user == -1) {
					const rrrembed = new Discord.MessageEmbed()
						.setAuthor(guild.name)
						.setTitle('Error!')
						.setDescription(`**${Member.user.tag} is not muted.**`)
						.setColor('RANDOM')
						.setTimestamp()
              message.reply({embeds: [rrrembed]})
					} else { 

							data.Users.splice(user, 1)
					data.save()
					await Member.roles.remove(role)
				 const rrrrembed = new Discord.MessageEmbed()
						.setAuthor(guild.name)
						.setTitle('Unmuted!')
						.setDescription(`**${Member.user.tag} has been unmuted.**`)
						.setColor('RANDOM')
						.setFooter(`Unmuted by ${message.author.username}`, message.author.displayAvatarURL())
						.setTimestamp()
            message.reply({embeds: [rrrrembed]})
			Member.send({embeds: [
                new Discord.MessageEmbed()
                .setAuthor(guild.name)
                .setTitle('Unmuted!')
                .setDescription(`**${Member.user.tag} has been unmuted.**`)
                .setColor('RANDOM')
            ]})
			guild.channels.cache.get('832524541883580426').send({embeds: [rrrrembed]})
				}
				}
				) 
}
				
    }
}	