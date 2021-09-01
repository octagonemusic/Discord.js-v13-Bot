const onoffSchema = require('../schemas/onoff-schema')
const client = require("../index")

client.on("messageCreate", async(message) => {

    const { guild, member } = message

    if (message.author.bot) return
    
    onoffSchema.findOne({ guildId: guild.id, userId: member.id }, async (err, data) => {
        if (data) {
          const off = data.off === 1
          if (off) {
            message.delete()
          } else {
            return
          }
        } else {
          return
        }
      })
})
