const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const fetch = require('node-fetch')
const emo_config = require('../../emoji_config.json')
const osuSchema = require("../../schemas/osu-schema")

module.exports = {
    name: "osu",
    description: "Shows your stats from your osu! profile",
    run: async(client, message, args) => {
        fetch("https://osu.ppy.sh/oauth/token", {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "grant_type": "client_credentials",
        "client_id": 1, //insert your client id you get from the osu! website
        "client_secret": "secret", //insert you clien secret you get from the osu! website
        "scope": "public"
    })
})
.then(response => {
    return response.json()    
})
.then(async (res) => {
    const target = message.mentions.members.first() || message.member
    await osuSchema.findOne({ userId: target.id}, async(err, data) => {
         if(data) {
          let user = args.join(" ")
          if(message.mentions.users.first() || !args.length) user = data.osuuser
          fetch(`https://osu.ppy.sh/api/v2/users/${user}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${res.access_token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }).then(info => {
            return info.json()
        }).then(info => {
            try{
                console.log(info)
        
            const embed = new MessageEmbed()
                  .setAuthor(`On the osu! Bancho server`, `https://www.countryflags.io/${info.country_code}/shiny/64.png`)
                  .setTitle(`osu! Standard profile for ${info.username}`)
                  .setURL(`https://osu.ppy.sh/users/${info.id}`)
                  .setColor("RANDOM")
                  .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
                  .setThumbnail(info.avatar_url)
                  .setDescription(`**Global Ranking:** #${info.statistics.global_rank.toLocaleString() || 0} \r\n**Country Ranking (${info.country_code}):** #${info.statistics.country_rank.toLocaleString() || 0}\r\n**Level:** ${info.statistics.level.current || 0} + ${info.statistics.level.progress || 0}.00%\r\n**Total PP:** ${info.statistics.pp || 0}\r\n**Accuracy:** ${info.statistics.hit_accuracy || 0}%\r\n**Playcount:** ${info.statistics.play_count.toLocaleString() || 0} (${Math.round(info.statistics.play_time / 3600) || 0} hours)\r\n**Score**:\n **- Ranked:** ${info.statistics.ranked_score.toLocaleString() || 0}\n **- Total:** ${info.statistics.total_score.toLocaleString() || 0}`)
                  .addField('Rank count:', `${emo_config.SSH} \`${info.statistics.grade_counts.ssh || 0}\` ${emo_config.SS} \`${info.statistics.grade_counts.ss || 0}\` ${emo_config.SH} \`${info.statistics.grade_counts.sh || 0}\` ${emo_config.S} \`${info.statistics.grade_counts.s || 0}\` ${emo_config.A} \`${info.statistics.grade_counts.a || 0}\``, true)
          message.reply({embeds: [embed]})
        } catch (e) {
            message.reply("The specified user has not been found on the osu! Bancho server!")
          }

            })
        } else {
            if(message.mentions.users.first() || !args.length){
            message.reply("The user has not linked their osu! account with the bot.")
          } else {
            let user = args.join(" ")
            fetch(`https://osu.ppy.sh/api/v2/users/${user}`, {
              method: "GET",
              headers: {
                  "Authorization": `Bearer ${res.access_token}`,
                  "Content-Type": "application/json",
                  "Accept": "application/json",
              }
          }).then(info => {
              return info.json()
          }).then(info => {
              try{
                  console.log(info)
          
              const embed = new MessageEmbed()
                  .setAuthor(`On the osu! Bancho server`, `https://www.countryflags.io/${info.country_code}/shiny/64.png`)
                  .setTitle(`osu! Standard profile for ${info.username}`)
                  .setURL(`https://osu.ppy.sh/users/${info.id}`)
                  .setThumbnail(info.avatar_url)
                  .setColor("RANDOM")
                  .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
                  .setDescription(`**Global Ranking:** #${info.statistics.global_rank.toLocaleString() || 0} \r\n**Country Ranking (${info.country_code}):** #${info.statistics.country_rank.toLocaleString() || 0}\r\n**Level:** ${info.statistics.level.current || 0} + ${info.statistics.level.progress || 0}.00%\r\n**Total PP:** ${info.statistics.pp || 0}\r\n**Accuracy:** ${info.statistics.hit_accuracy || 0}%\r\n**Playcount:** ${info.statistics.play_count.toLocaleString() || 0} (${Math.round(info.statistics.play_time / 3600) || 0} hours)\r\n**Score**:\n **- Ranked:** ${info.statistics.ranked_score.toLocaleString() || 0}\n **- Total:** ${info.statistics.total_score.toLocaleString() || 0}`)
                  .addField('Rank count:', `${emo_config.SSH} \`${info.statistics.grade_counts.ssh || 0}\` ${emo_config.SS} \`${info.statistics.grade_counts.ss || 0}\` ${emo_config.SH} \`${info.statistics.grade_counts.sh || 0}\` ${emo_config.S} \`${info.statistics.grade_counts.s || 0}\` ${emo_config.A} \`${info.statistics.grade_counts.a || 0}\``, true)
          message.reply({embeds: [embed]})
        } catch (e) {
            message.reply("The specified user has not been found on the osu! Bancho server!")
          }
              })
          }
        }
    })
})
    }
}