const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")

module.exports = {
    name : "ticket",
    description: "Opens a ticket!",
    run: async(client, message, args) => {
      if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply('You do not have admin permission');
      const embed = new MessageEmbed()
    .setTitle("Open a ticket!")
    .setDescription(`:tickets: **Open a ticket by clicking the button below.**
    
**:tickets: Please read the message above carefully before opening a ticket.**`)
    .setColor("#9B59B6")

    const row =  new MessageActionRow().addComponents(
        new MessageButton()
        .setStyle("PRIMARY")
        .setLabel('📩 Open a ticket!')
        .setCustomId("ticket")
    )

    message.channel.send({
        components: [row],
        embeds: [embed]
    })
    },
  };