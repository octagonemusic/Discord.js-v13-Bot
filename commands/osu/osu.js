const Discord = require('discord.js')
const nodeosu = require('node-osu')
const config = require('../../config.json')
const osu = new nodeosu.Api(config.apikey, { // Set your API Key in config.json
  resAsError: true,
  parseNumeric: true // Reject on not found instead of returning nothing. (default: true)
})
const emo_config = require('../../emoji_config.json')
const osuSchema = require('../../schemas/osu-schema')

module.exports = {
    
    name: "osu",
    description: "Shows the osu! statistics for the specified user.",
    usage: "<member>",
    run: async (client, message, args) => {

const target = message.mentions.members.first() || message.member
  await osuSchema.findOne({ userId: target.id}, async(err, data) => {
      if(data) {
        let user = args.join(" ")
        if(message.mentions.users.first() || !args.length) user = data.osuuser
        const au = await osu.getUser({ u: user })
  const flagnam = au.country.toLowerCase()
  const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`:flag_${flagnam}:  osu! profile for ${user}`)
    .setThumbnail(`http://s.ppy.sh/a/${au.id}`)
    .setURL(au.profileURL)
    .setDescription(`**Global Ranking:** #${au.pp.rank.toLocaleString()} \r\n**Country Ranking (${au.country}):** #${au.pp.countryRank.toLocaleString()}\r\n**Level:** ${Math.round(au.level * 100) / 100}\r\n**Total PP:** ${au.pp.raw}\r\n**Accuracy:** ${Math.round(au.accuracy * 100) / 100 + '%'}\r\n**Playcount:** ${au.counts.plays}\r\n**Score**:\n **- Ranked:** ${au.scores.ranked.toLocaleString()}\n **- Total:** ${au.scores.total.toLocaleString()}`)
    .addField('Rank count:', `${emo_config.SSH} \`${au.counts.SSH}\`\n${emo_config.SS}  \`${au.counts.SS}\`\n${emo_config.SH}  \`${au.counts.SH}\`\n${emo_config.S}  \`${au.counts.S}\`\n${emo_config.A}  \`${au.counts.A}\``, true)
    .addField('Hit count:', `${emo_config.hit50}  \`${au.counts['50'].toLocaleString()}\`\n${emo_config.hit100}  \`${au.counts['100'].toLocaleString()}\`\n${emo_config.hit300} \`${au.counts['300'].toLocaleString()}\``, true)
  message.reply({embeds: [embed]})
      } else {
          if(message.mentions.users.first() || !args.length){
          message.reply("The user has not linked their osu! account with the bot.")
        } else {
            let user = args.join(" ")
        const au = await osu.getUser({ u: user })
  const flagnam = au.country.toLowerCase()
  const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`:flag_${flagnam}:  osu! profile for ${user}`)
    .setThumbnail(`http://s.ppy.sh/a/${au.id}`)
    .setURL(au.profileURL)
    .setDescription(`**Global Ranking:** #${au.pp.rank.toLocaleString()} \r\n**Country Ranking (${au.country}):** #${au.pp.countryRank.toLocaleString()}\r\n**Level:** ${Math.round(au.level * 100) / 100}\r\n**Total PP:** ${au.pp.raw}\r\n**Accuracy:** ${Math.round(au.accuracy * 100) / 100 + '%'}\r\n**Playcount:** ${au.counts.plays}\r\n**Score**:\n **- Ranked:** ${au.scores.ranked.toLocaleString()}\n **- Total:** ${au.scores.total.toLocaleString()}`)
    .addField('Rank count:', `${emo_config.SSH} \`${au.counts.SSH}\`\n${emo_config.SS}  \`${au.counts.SS}\`\n${emo_config.SH}  \`${au.counts.SH}\`\n${emo_config.S}  \`${au.counts.S}\`\n${emo_config.A}  \`${au.counts.A}\``, true)
    .addField('Hit count:', `${emo_config.hit50}  \`${au.counts['50'].toLocaleString()}\`\n${emo_config.hit100}  \`${au.counts['100'].toLocaleString()}\`\n${emo_config.hit300} \`${au.counts['300'].toLocaleString()}\``, true)
  message.reply({embeds: [embed]})
        }
      }
  })
  
}}