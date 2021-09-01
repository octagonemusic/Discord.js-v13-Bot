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
    SS: `${emo_config.SS}`,
    SSH: `${emo_config.SSH}`

}

module.exports = {
    name: "recent",
    aliases: ["rs"],
    description: "Shows the stats of your most recent osu! play.",
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
            
                console.log(info)

                let infoid;
                if (info.id === infoid) return message.reply("The specified user's recent replay hasn't been found on the osu! Bancho server.")

                const url = new URL(
                    `https://osu.ppy.sh/api/v2/users/${info.id}/scores/recent`
                );
                
                let params = {
                    "include_fails": "1",
                    "mode": "osu",
                    "limit": "1",
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
                .then(([response]) => {
                    console.log(response)
                    
                    let xd;
                    if(response === xd) return message.reply("The specified user's recent replay has not been found on the osu! Bancho server.")
                    fetch(`https://osu.ppy.sh/api/v2/beatmaps/${response.beatmap.id}`, {
                          method: "GET",
                          headers: {
                              "Authorization": `Bearer ${res.access_token}`,
                              "Content-Type": "application/json",
                              "Accept": "application/json",
                          }
                      }).then(beatmap => {
                          return beatmap.json()
                      }).then(beatmap => {

                        
                        
                        const embed = new MessageEmbed()
                            .setAuthor(`Recent osu! Standard play for ${response.user.username}`, response.user.avatar_url)
                            .setTitle(`${beatmap.beatmapset.title} [${response.beatmap.version}] [${response.beatmap.difficulty_rating}★]`)
                            .setDescription(
                                `**Mods:** ${[response.mods || "No Mods"]}\n\n**Rank:** ${difficultyRanks[response.rank]}\n\n**PP:** ${(Math.round(response.pp *100))/100 || 0}\n\n**Accuracy:** ${(Math.round(response.accuracy * 10000))/100}%\n\n**Score:** ${response.score.toLocaleString()}\n\n**Max Combo:** x${response.max_combo}/${beatmap.max_combo}`
                            )
                            .setURL(response.beatmap.url)
                            .setColor("RANDOM")
                            .setFooter(`Requested by ${message.author.tag} | osu! Bancho server`, message.author.displayAvatarURL({dynamic: true}))
                            .setThumbnail(response.beatmapset.covers.list)
            
                            message.reply({embeds: [embed]})
                      })
                        
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
            
                console.log(info)

                let infoid;
                if (info.id === infoid) return message.reply("The specified user's recent replay hasn't been found on the osu! Bancho server.")
        
                const url = new URL(
                    `https://osu.ppy.sh/api/v2/users/${info.id}/scores/recent`
                );
                
                let params = {
                    "include_fails": "1",
                    "mode": "osu",
                    "limit": "1",
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
                .then(([response]) => {
                  console.log(response)
                  let xd;
                  if(response === xd) return message.reply("The specified user's recent replay has not been found on the osu! Bancho server.")

                    fetch(`https://osu.ppy.sh/api/v2/beatmaps/${response.beatmap.id}`, {
                          method: "GET",
                          headers: {
                              "Authorization": `Bearer ${res.access_token}`,
                              "Content-Type": "application/json",
                              "Accept": "application/json",
                          }
                      }).then(beatmap => {
                          return beatmap.json()
                      }).then(beatmap => {
                        
                        let mods = []
                        if (mods) {
                            mods = "No Mods"
                        } else {
                            mods = [response.mods]
                        }

                        const embed = new MessageEmbed()
                            .setAuthor(`Recent osu! Standard play for ${response.user.username}`, response.user.avatar_url)
                            .setTitle(`${beatmap.beatmapset.title} [${response.beatmap.version}] [${response.beatmap.difficulty_rating}★]`)
                            .setDescription(
                                `**Mods:** ${response.mods}\n\n**Rank:** ${difficultyRanks[response.rank]}\n\n**PP:** ${(Math.round(response.pp *100))/100 || 0}\n\n**Accuracy:** ${(Math.round(response.accuracy * 10000))/100}%\n\n**Score:** ${response.score.toLocaleString()}\n\n**Max Combo:** x${response.max_combo}/${beatmap.max_combo}`
                            )
                            .setURL(response.beatmap.url)
                            .setColor("RANDOM")
                            .setFooter(`Requested by ${message.author.tag} | osu! Bancho server`, message.author.displayAvatarURL({dynamic: true}))
                            .setThumbnail(response.beatmapset.covers.list)
            
                            message.reply({embeds: [embed]})
                      })
                    })
              })
          } 
          
        }
    })

})
    }}