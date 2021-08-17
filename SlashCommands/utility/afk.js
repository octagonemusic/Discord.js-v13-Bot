const { Database } = require('quickmongo')
const { mongoPath } = require('../../config.json')
const quickmongo = new Database(mongoPath)

module.exports = {
	name : 'afk',
	description : 'Sets your AFK',
    options: [
        {
            name: 'reason',
            description: "Give reason for your AFK",
            required: false,
            type: "STRING"
        }
    ],
	run : async (client, interaction, args) => {
		let [reason] = args
        if(!reason) reason = "No AFK reason provided"
		const oldNickname = interaction.member.nickname || interaction.user.username;
        const nickname = `[AFK] ${oldNickname}`
		const time = Date.now()
        
        try {
			await quickmongo.set(`afk-${interaction.user.id}+${interaction.guild.id}`, reason)

			await quickmongo.set(`afk-${interaction.user.id}`, oldNickname)

			await quickmongo.set(`afk-${interaction.user.id}+1`, time)

		interaction.followUp({content: `Your AFK has been set: ${reason}`})
		} catch (err) {
			console.log(err)
			interaction.followUp('👎 **| Could not set AFK status.**')
		}

		try {
			await interaction.member.setNickname(nickname)
		} catch (err) {
			console.log(err)
		}
	}
}