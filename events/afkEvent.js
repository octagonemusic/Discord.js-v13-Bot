const client = require("../index")
const { Database } = require("quickmongo")
const { mongoPath } = require("../config.json")
const quickmongo = new Database(mongoPath)
const moment = require("moment")


client.on("messageCreate", async(message) => {

  if(message.author.bot) return
    
    if (await quickmongo.fetch(`afk-${message.author.id}+${message.guild.id}`)) {
        const info = await quickmongo.get(`afk-${message.author.id}+${message.guild.id}`)
        const user = message.member
        const oldNickname = await quickmongo.get(`afk-${message.author.id}`)
        await quickmongo.delete(`afk-${message.author.id}+${message.guild.id}`)
        await quickmongo.delete(`afk-${message.author.id}`)
        await quickmongo.delete(`afk-${message.author.id}+1`)
  
        try {
          await user.setNickname(oldNickname)
        } catch {
          console.log('👎 | Cannot reset nickname.')
        }

       message.reply(`Welcome back ${message.author}! I have successfully removed your AFK!`)
       .then(msg => {
        setTimeout(() => msg.delete(), 5000)
      })
      }

      const mentionedMember = message.mentions.members.first()
      if (mentionedMember) {
        if (await quickmongo.fetch(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) {
          message.reply(`${mentionedMember.user.tag} is AFK: ${await quickmongo.get(`afk-${message.mentions.members.first().id}+${message.guild.id}`)} - ${moment(await quickmongo.get(`afk-${message.mentions.members.first().id}+1`)).fromNow()}`)
            ;
        } else return;
      }
})