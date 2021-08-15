module.exports = {
    name: "say",
    description: "Send embeds into the specified channel.",
    usage: '<Channel mention> <JSON>',
    run: (client, message, args) => {
      // get the target channel
      if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply("You need admin permissions to run this command!")
      const targetChannel = message.mentions.channels.first()
      if (!targetChannel) {
        message.reply('Please specify a channel to send the embed in')
        return
      }
  
      // removes the channel mention
      args.shift()
  
      try {
        // get the JSON data
        const json = JSON.parse(args.join(' '))
        const { text = '' } = json
  
        // send the embed
        targetChannel.send({
          embeds: [json]
        })
      } catch (error) {
        message.reply(`Invalid JSON ${error.message}`)
      }
    },
  }