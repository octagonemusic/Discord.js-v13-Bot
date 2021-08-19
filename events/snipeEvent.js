const client = require("..");

client.on("messageDelete", async(message) => {

    if(message.author.bot) return;

    const onoffSchema = require('../schemas/onoff-schema')

    const { guild, member } = message
    
    onoffSchema.findOne({ guildId: guild.id, userId: member.id }, async (err, data) => {
        if (data) {
          const off = data.off === 1
          if (off) {
            return
          } else {
            let snipes = client.snipes.get(message.channel.id) || []
            if (snipes.length > 5) snipes = snipes.slice(0, 4)
          
            snipes.unshift({
              msg: message,
              image: message.attachments.first() ? message.attachments.first().proxyURL : null,
              time: Date.now()
            })
          
            client.snipes.set(message.channel.id, snipes)
          }
        } else {
          let snipes = client.snipes.get(message.channel.id) || []
          if (snipes.length > 5) snipes = snipes.slice(0, 4)
        
          snipes.unshift({
            msg: message,
            image: message.attachments.first() ? message.attachments.first().proxyURL : null,
            time: Date.now()
          })
        
          client.snipes.set(message.channel.id, snipes)
        }
})
})