const Discord = require('discord.js')
const Schema = require('../../schemas/mute-schema')


module.exports = {
	name: 'mute',
	description: 'Mutes the mentioned user.',
	usage: "<member>",
	timeout: 5,
	run: async (client, message, args) => {
		const { guild } = message
		const role = guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
		const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
		let reason = args.slice(1).join(" ")
		if (!reason) 
			reason = "No reason specified"
		
		if (!message.member.permissions.has('MANAGE_MESSAGES')) {
			const embed = new Discord.MessageEmbed()
				.setAuthor(message.guild.name)
				.setTitle('Error!')
				.setDescription('**You do not have the permission to mute members.**')
				.setColor('RANDOM')
				.setTimestamp()
			message.channel.send({embeds: [embed]})


		} else if (!Member) {
			const rembed = new Discord.MessageEmbed()
				.setAuthor(message.guild.name)
				.setTitle('Error!')
				.setDescription('**Please specify someone to mute.**')
				.setColor('RANDOM')
				.setTimestamp()
			message.channel.send({embeds: [rembed]})
		} else if (Member.roles.cache.has(role.id)) {
			const rrembed = new Discord.MessageEmbed()
				.setAuthor(message.guild.name)
				.setTitle('Error!')
				.setDescription(`**${Member.username.tag} is already muted.**`)
				.setColor('RANDOM')
				.setTimestamp()
			message.channel.send({embeds: [rrembed]})
		} else if (Member.permissions.has("KICK_MEMBERS")) {
			const embed = new Discord.MessageEmbed()
				.setAuthor(message.guild.name)
				.setTitle('Error!')
				.setDescription('**You cannot mute Admins and Moderators.**')
				.setColor('RANDOM')
				.setTimestamp()
			message.channel.send({embeds: [embed]})
		} else {
			await Member.roles.add(role);
			await Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
				if (!data) {
					new Schema({
						Guild: message.guild.id,
						Users: Member.id,
					}).save()
				} else {
					data.Users.push(Member.id)
					data.save()
				}
			})

			const rrrembed = new Discord.MessageEmbed()
				.setAuthor(message.guild.name)
				.setTitle('Muted!')
				.setDescription(`**${Member.user.tag}** has been muted.`)
                .addFields(
                    {
                        name: `Reason`,
                        value: reason
                    }
                )
				.setColor('RED')
				.setFooter(`Muted by ${message.author.username}`, message.author.displayAvatarURL())
				.setTimestamp()
			message.channel.send({embeds: [rrrembed]})
			Member.send({embeds: [
                new Discord.MessageEmbed()
                .setAuthor(message.guild.name)
                .setTitle(`Muted!`)
                .setDescription(`You have been muted in ${message.guild.name}`)
                .setColor("RED")
                .addFields(
                    {
                        name: `Reason`,
                        value: reason
                    }
                )
            ]})
			guild.channels.cache.get('832524541883580426').send({embeds: [rrrembed]})
		}
	}
}