const client = require("../index")
const mongo = require("../handler/mongoose")
const { MessageEmbed } = require("discord.js")

client.on("guildMemberAdd", async(member) => {
    const Schema = require('../schemas/mute-schema')
    const { guild } = member
    const { memberCount } = guild
    if (member.guild.id === "832467028802797578") {
      client.channels.cache.get("832995579142602802").send(`**Please welcome ${member}! We are at ${memberCount} members now!**`)
      member.roles.add("832475545362497567")
    }
  
    const data = await mongo().then(async (mongoose) => {
      try {
        await Schema.findOne({
          Guild: member.guild.id
        },
          async (err, data) => {
            if (!data) return
            const user = data.Users.findIndex((prop) => prop === member.id)
            if (user == -1) return
            const role = member.guild.roles.cache.find(
              (role) => role.name.toLowerCase() == "muted"
            )
            member.roles.add(role.id)
          }
        )
      } catch (err) {
        console.log(err)
      }
    })
  
    const embed = new MessageEmbed()
      .setAuthor(guild.name)
      .setTitle(`Welcome to the server!`)
      .setDescription(`${member}`)
      .addFields(
        {
          name: "Please read about our server here:",
          value: `<#832479548129673217>`,
        },
        {
          name: "Please read the rules over here:",
          value: `<#832478489448808498>`,
        }
      )
      .setColor("#ffc200")
      .setImage("https://media.giphy.com/media/FWVzupqhhcRFsIRsEv/giphy.gif")
      .setFooter(`Thank you for joining!`, member.user.displayAvatarURL({dynamic: true}))
      .setTimestamp()
  
    if (member.guild.id === "832467028802797578") {
      client.channels.cache.get("832479476511670322").send({embeds: [embed], content: `${member}`})
    }

    const onoffSchema = require('../schemas/onoff-schema')
    onoffSchema.findOne({ guildId: guild.id, userId: member.id }, async (err, data) => {
      if (data) {
        const off = data.off === 1
        if (off) {
          const role = member.guild.roles.cache.get('857686987749588992')
          member.roles.add(role)
        } else {
          return
        }
      } else {
        return
      }
    })
  
})