const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const fetch = require('node-fetch')
const emo_config = require('../../emoji_config.json')
const osuSchema = require("../../schemas/osu-schema")

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
    name: "osutop",
    description: "Shows the stats of your top 5 osu! plays.",
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

                let infoid;
                if (info.id === infoid) return message.reply("The specified user has not been found on the osu!Bancho server.")

                const url = new URL(
                    `https://osu.ppy.sh/api/v2/users/${info.id}/scores/best`
                );
                
                let params = {
                    "mode": "osu",
                    "limit": "5",
                };
                Object.keys(params)
                    .forEach(key => url.searchParams.append(key, params[key]));
                
                let headers = {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${res.access_token}`
                };
                
                
                    fetch(url, {
                    method: "GET",
                    headers,
                }).then(response => response.json())
                .then((response) => {
                    const x = response
                    var beatmaptitles  = x.map(v => v.beatmapset.title)
                    var beatmapid = x.map(v => v.beatmap.id)
                    var difficulty = x.map(v => v.beatmap.version)
                    let mods = x.map(v => v.mods)
                    var stars = x.map(v => v.beatmap.difficulty_rating)
                    var rank = x.map(v => v.rank)
                    var pp = x.map(v => v.pp)
                    var acc = x.map (v => v.accuracy)
                    var score = x.map(v => v.score)
                    var maxcombo = x.map(v => v.max_combo)
                    var count50 = x.map(v => v.statistics.count_50)
                    var count100 = x.map(v => v.statistics.count_100)
                    var count300 = x.map(v => v.statistics.count_300)
                    var miss = x.map(v => v.statistics.count_miss)

                    console.log(mods[0])
                    if(mods[0] === [[]]) mods = "No Mod"

                    try{
                        const best1 = (`**1. [${beatmaptitles[0]} [${difficulty[0]}]](https://osu.ppy.sh/beatmaps/${beatmapid[0]}) [${stars[0]}★]**\n▸ ${difficultyRanks[rank[0]]} ▸**${(Math.round(pp[0] *100))/100 || 0}PP** ▸${(Math.round(acc[0] * 10000))/100}%\n▸${score[0].toLocaleString()} ▸[${count300[0]}/${count100[0]}/${count50[0]}/${miss[0]}]\n▸${mods[0]}`)
                        const best2 = (`**2. [${beatmaptitles[1]} [${difficulty[1]}]](https://osu.ppy.sh/beatmaps/${beatmapid[1]}) [${stars[1]}★]**\n▸ ${difficultyRanks[rank[1]]} ▸**${(Math.round(pp[1] *100))/100 || 0}PP** ▸${(Math.round(acc[1] * 10000))/100}%\n▸${score[1].toLocaleString()} ▸[${count300[1]}/${count100[1]}/${count50[1]}/${miss[1]}]\n▸${mods[1]}`)
                        const best3 = (`**3. [${beatmaptitles[2]} [${difficulty[2]}]](https://osu.ppy.sh/beatmaps/${beatmapid[2]}) [${stars[2]}★]**\n▸ ${difficultyRanks[rank[2]]} ▸**${(Math.round(pp[2] *100))/100 || 0}PP** ▸${(Math.round(acc[2] * 10000))/100}%\n▸${score[2].toLocaleString()} ▸[${count300[2]}/${count100[2]}/${count50[2]}/${miss[2]}]\n▸${mods[2]}`)
                        const best4 = (`**4. [${beatmaptitles[3]} [${difficulty[3]}]](https://osu.ppy.sh/beatmaps/${beatmapid[3]}) [${stars[3]}★]**\n▸ ${difficultyRanks[rank[3]]} ▸**${(Math.round(pp[3] *100))/100 || 0}PP** ▸${(Math.round(acc[3] * 10000))/100}%\n▸${score[3].toLocaleString()} ▸[${count300[3]}/${count100[3]}/${count50[3]}/${miss[3]}]\n▸${mods[3]}`)
                        const best5 = (`**5. [${beatmaptitles[4]} [${difficulty[4]}]](https://osu.ppy.sh/beatmaps/${beatmapid[4]}) [${stars[4]}★]**\n▸ ${difficultyRanks[rank[4]]} ▸**${(Math.round(pp[4] *100))/100 || 0}PP** ▸${(Math.round(acc[4] * 10000))/100}%\n▸${score[4].toLocaleString()} ▸[${count300[4]}/${count100[4]}/${count50[4]}/${miss[4]}]\n▸${mods[4]}`)
    
                        const embed = new MessageEmbed()
                            .setAuthor(`Top 5 plays osu! Standard Plays for ${info.username}`, `https://www.countryflags.io/${info.country_code}/shiny/64.png`)
                            .setThumbnail(info.avatar_url)
                            .setDescription(`${best1}\n\n${best2}\n\n${best3}\n\n${best4}\n\n${best5}`)
                            .setColor("RANDOM")
                            .setFooter(`Requested by ${message.author.tag} | osu! Bancho server`, message.author.displayAvatarURL({dynamic: true}))
                             
                            
    
                            message.channel.send({embeds: [embed]})
                       } catch(e) {
                           message.reply("That user does not have 5 top plays ")
                       } 
                    
                })

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

                let infoid;
                if (info.id === infoid) return message.reply("The specified user has not been found on the osu! Bancho server.")
        
                const url = new URL(
                    `https://osu.ppy.sh/api/v2/users/${info.id}/scores/best`
                );
                
                let params = {
                    "mode": "osu",
                    "limit": "5",
                };
                Object.keys(params)
                    .forEach(key => url.searchParams.append(key, params[key]));
                
                let headers = {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${res.access_token}`
                };
                
                fetch(url, {
                    method: "GET",
                    headers,
                }).then(response => response.json())
                .then((response) => {
                    const x = response
                    var beatmaptitles  = x.map(v => v.beatmapset.title)
                    var beatmapid = x.map(v => v.beatmap.id)
                    var difficulty = x.map(v => v.beatmap.version)
                    let mods = x.map(v => v.mods)
                    var stars = x.map(v => v.beatmap.difficulty_rating)
                    var rank = x.map(v => v.rank)
                    var pp = x.map(v => v.pp)
                    var acc = x.map (v => v.accuracy)
                    var score = x.map(v => v.score)
                    var maxcombo = x.map(v => v.max_combo)
                    var count50 = x.map(v => v.statistics.count_50)
                    var count100 = x.map(v => v.statistics.count_100)
                    var count300 = x.map(v => v.statistics.count_300)
                    var miss = x.map(v => v.statistics.count_miss)

                    console.log(mods[0])
                    if(mods[0] === [[]]) mods = "No Mod"

                   try{
                    const best1 = (`**1. [${beatmaptitles[0]} [${difficulty[0]}]](https://osu.ppy.sh/beatmaps/${beatmapid[0]}) [${stars[0]}★]**\n▸ ${difficultyRanks[rank[0]]} ▸**${(Math.round(pp[0] *100))/100 || 0}PP** ▸${(Math.round(acc[0] * 10000))/100}%\n▸${score[0].toLocaleString()} ▸[${count300[0]}/${count100[0]}/${count50[0]}/${miss[0]}]\n▸${mods[0]}`)
                    const best2 = (`**2. [${beatmaptitles[1]} [${difficulty[1]}]](https://osu.ppy.sh/beatmaps/${beatmapid[1]}) [${stars[1]}★]**\n▸ ${difficultyRanks[rank[1]]} ▸**${(Math.round(pp[1] *100))/100 || 0}PP** ▸${(Math.round(acc[1] * 10000))/100}%\n▸${score[1].toLocaleString()} ▸[${count300[1]}/${count100[1]}/${count50[1]}/${miss[1]}]\n▸${mods[1]}`)
                    const best3 = (`**3. [${beatmaptitles[2]} [${difficulty[2]}]](https://osu.ppy.sh/beatmaps/${beatmapid[2]}) [${stars[2]}★]**\n▸ ${difficultyRanks[rank[2]]} ▸**${(Math.round(pp[2] *100))/100 || 0}PP** ▸${(Math.round(acc[2] * 10000))/100}%\n▸${score[2].toLocaleString()} ▸[${count300[2]}/${count100[2]}/${count50[2]}/${miss[2]}]\n▸${mods[2]}`)
                    const best4 = (`**4. [${beatmaptitles[3]} [${difficulty[3]}]](https://osu.ppy.sh/beatmaps/${beatmapid[3]}) [${stars[3]}★]**\n▸ ${difficultyRanks[rank[3]]} ▸**${(Math.round(pp[3] *100))/100 || 0}PP** ▸${(Math.round(acc[3] * 10000))/100}%\n▸${score[3].toLocaleString()} ▸[${count300[3]}/${count100[3]}/${count50[3]}/${miss[3]}]\n▸${mods[3]}`)
                    const best5 = (`**5. [${beatmaptitles[4]} [${difficulty[4]}]](https://osu.ppy.sh/beatmaps/${beatmapid[4]}) [${stars[4]}★]**\n▸ ${difficultyRanks[rank[4]]} ▸**${(Math.round(pp[4] *100))/100 || 0}PP** ▸${(Math.round(acc[4] * 10000))/100}%\n▸${score[4].toLocaleString()} ▸[${count300[4]}/${count100[4]}/${count50[4]}/${miss[4]}]\n▸${mods[4]}`)

                    const embed = new MessageEmbed()
                        .setAuthor(`Top 5 plays osu! Standard Plays for ${info.username}`, `https://www.countryflags.io/${info.country_code}/shiny/64.png`)
                        .setThumbnail(info.avatar_url)
                        .setDescription(`${best1}\n\n${best2}\n\n${best3}\n\n${best4}\n\n${best5}`)
                        .setColor("RANDOM")
                        .setFooter(`Requested by ${message.author.tag} | osu! Bancho server`, message.author.displayAvatarURL({dynamic: true}))
                         
                        

                        message.channel.send({embeds: [embed]})
                   } catch(e) {
                       message.reply("That user does not have 5 top plays ")
                   } 

                    })
              })
          } 
          
        }
    })

})
    }}