const nodeosu = require("node-osu")
const Discord = require("discord.js")
const config = require('../../config.json')
const osu = new nodeosu.Api(config.apikey, { // Set your API Key in config.json
    resAsError: true,
    completeScores: true,
    parseNumeric: true
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
    X: `${emo_config.SS}`,
    XH: `${emo_config.SSH}`

}

module.exports = {
    name: "osubest",
    run: async (client, message, args) => {
        const target = message.mentions.members.first() || message.member
        await osuSchema.findOne({ userId: target.id }, async (err, data) => {
            if (data) {

                let user = args.join(" ")
                if (message.mentions.users.first() || !args.length) user = data.osuuser

                const au = await osu.getUser({ u: user })
                osu.getUserBest({ u: user }).then(scores => {

                    const embed = new Discord.MessageEmbed()
                        .setAuthor(`Best play by ${user}`)
                        .setThumbnail(`http://s.ppy.sh/a/${au.id}`)
                        .setTitle(`${scores[0].beatmap.title}`)
                        .setURL(`https://osu.ppy.sh/beatmapsets/${scores[0].beatmap.beatmapSetId}`)
                        .setDescription(`**Difficulty:** ${scores[0].beatmap.version} (${scores[0].beatmap.difficulty.rating}★)\n\n**Mods:** ${scores[0].mods}\n\n**Score:** ${scores[0].score.toLocaleString()}\n\n**Rank:** ${difficultyRanks[scores[0].rank]}\n\n**Accuracy:** ${Math.round(scores[0].accuracy * 100) + '%'}\n\n**Max Combo:** ${scores[0].maxCombo}/${scores[0].beatmap.maxCombo}\n\n**PP:** ${scores[0].pp} PP `)
                        .setColor("RANDOM")
                        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
                    message.reply({ embeds: [embed] })
                });
            } else {
                if (message.mentions.users.first() || !args.length) {
                    message.reply("The user has not linked their osu! account with the bot.")
                } else {
                    let user = args.join(" ")

                    const au = await osu.getUser({ u: user })
                    osu.getUserBest({ u: user }).then(scores => {

                        const embed = new Discord.MessageEmbed()
                            .setAuthor(`Best play by ${user}`)
                            .setThumbnail(`http://s.ppy.sh/a/${au.id}`)
                            .setTitle(`${scores[0].beatmap.title}`)
                            .setURL(`https://osu.ppy.sh/beatmapsets/${scores[0].beatmap.beatmapSetId}`)
                            .setDescription(`**Difficulty:** ${scores[0].beatmap.version} (${scores[0].beatmap.difficulty.rating}★)\n\n**Mods:** ${scores[0].mods}\n\n**Score:** ${scores[0].score.toLocaleString()}\n\n**Rank:** ${difficultyRanks[scores[0].rank]}\n\n**Accuracy:** ${Math.round(scores[0].accuracy * 100) + '%'}\n\n**Max Combo:** ${scores[0].maxCombo}/${scores[0].beatmap.maxCombo}\n\n**PP:** ${scores[0].pp} PP `)
                            .setColor("RANDOM")
                            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
                        message.reply({ embeds: [embed] })
                    })
                }
            }
        })
    }
}