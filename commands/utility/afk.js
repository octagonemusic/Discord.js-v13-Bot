const { Database } = require('quickmongo')
const { mongoPath } = require('../../config.json')
const quickmongo = new Database(mongoPath)

module.exports = {
	name : 'afk',
	description : 'Sets your AFK',
	timeout : 5, 
	usage : "<reason>",
	run : async (client, message, args) => {
		let reason = args.join(' ')
        if(!reason) reason = "No AFK reason provided"
		const oldNickname = message.member.nickname || message.author.username;
        const nickname = `[AFK] ${oldNickname}`
		const time = Date.now()
        
        try {
			await quickmongo.set(`afk-${message.author.id}+${message.guild.id}`, reason || 'No AFK reason provided.')

			await quickmongo.set(`afk-${message.author.id}`, oldNickname)

			await quickmongo.set(`afk-${message.author.id}+1`, time)

		message.reply({content: `Your AFK has been set: ${reason}`})
		} catch (err) {
			console.log(err)
			message.reply('👎 **| Could not set AFK status.**')
		}

		try {
			await message.member.setNickname(nickname)
		} catch (err) {
			console.log(err)
		}
	}
}