const client = require("..")

client.on("messageUpdate", async(oldMessage, newMessage) => {

    if(oldMessage.author.bot) return
    let esnipes = client.esnipes.get(oldMessage.channel.id) || []
    if (esnipes.length > 5) esnipes = esnipes.slice(0, 4)
  
    esnipes.unshift({
      oldmsg: oldMessage,
      newmsg: newMessage,
      image:  oldMessage.attachments.first() ? oldMessage.attachments.first().proxyURL : null,
      time: Date.now()
    })
  
    client.esnipes.set(oldMessage.channel.id, esnipes)
})
   