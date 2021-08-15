const Discord = require('discord.js')
const nodeosu = require('node-osu')
const config = require('../../config.json')
const osu = new nodeosu.Api(config.apikey, { // Set your API Key in config.json
    resAsError: true,
    completeScores: true, // When fetching scores also fetch the beatmap they are for (Allows getting accuracy) (default: false)
    parseNumeric: true // Reject on not found instead of returning nothing. (default: true)
})
const emo_config = require('../../emoji_config.json')
const osuSchema = require('../../schemas/osu-schema')

const difficultyRanks = {
    A: `${emo_config.A}`,
    B: `${emo_config.B}`,
    C: `${emo_config.C}`,
    D: `${emo_config.D}`,
    F: `${emo_config.F}`,
    S: `${emo_config.S}`,
    SH: `${emo_config.SH}`,
    SS: `${emo_config.SS}`,
    SSH: `${emo_config.SSH}`

}

module.exports = {

    name: "recent",
    aliases: ["rs"],
    run: async (client, message, args) => {
        const target = message.mentions.members.first() || message.member

        await osuSchema.findOne({ userId: target.id }, async (err, data) => {
            if (data) {

                let user = args.join(" ")
                if (message.mentions.users.first() || !args.length) user = data.osuuser
                const au = await osu.getUser({ u: user })
                osu.getUserRecent({ u: user }).then(scores => {



                    const embed = new Discord.MessageEmbed()
                        .setAuthor(`Recent map played by ${user}`)
                        .setTitle(`${scores[0].beatmap.title}`)
                        .setThumbnail(`http://s.ppy.sh/a/${au.id}`)
                        .setURL(`https://osu.ppy.sh/beatmapsets/${scores[0].beatmap.beatmapSetId}`)
                        .setDescription(`**Difficulty:** ${scores[0].beatmap.version} (${scores[0].beatmap.difficulty.rating}★)\n\n**Mods:** ${scores[0].mods}\n\n**Score**: ${scores[0].score.toLocaleString()}\n\n**Rank:** ${difficultyRanks[scores[0].rank]}\n\n**Accuracy:** ${Math.round(scores[0].accuracy * 100) + '%'}\n\n**Max Combo:** ${scores[0].maxCombo}/${scores[0].beatmap.maxCombo}\n\n **Played at:** ${scores[0].date}`)
                        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
                        .setColor("RANDOM")
                    message.reply({ embeds: [embed] })
                });

            } else {
                if (message.mentions.users.first() || !args.length) {
                    message.reply("The user has not linked their osu! account with the bot.")
                } else {
                    let user = args.join(" ")
                    if (message.mentions.users.first() || !args.length) user = data.osuuser
                    const au = await osu.getUser({ u: user })
                    osu.getUserRecent({ u: user }).then(scores => {



                        const embed = new Discord.MessageEmbed()
                            .setAuthor(`Recent map played by ${user}`)
                            .setTitle(`${scores[0].beatmap.title}`)
                            .setThumbnail(`http://s.ppy.sh/a/${au.id}`)
                            .setURL(`https://osu.ppy.sh/beatmapsets/${scores[0].beatmap.beatmapSetId}`)
                            .setDescription(`**Difficulty:** ${scores[0].beatmap.version} (${scores[0].beatmap.difficulty.rating}★)\n\n**Mods:** ${scores[0].mods}\n\n**Score**: ${scores[0].score.toLocaleString()}\n\n**Rank:** ${difficultyRanks[scores[0].rank]}\n\n**Accuracy:** ${Math.round(scores[0].accuracy * 100) + '%'}\n\n**Max Combo:** ${scores[0].maxCombo}/${scores[0].beatmap.maxCombo}\n\n **Played at:** ${scores[0].date}`)
                            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
                            .setColor("RANDOM")
                        message.reply({ embeds: [embed] })
                    })
                }
            }
        })
    }
}