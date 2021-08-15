const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
  name: 'f',
  description: "A simple command used to pay respects.",
  timeout: 5,
  usage: "<reason>",
  run: async(client, message, args) =>{
        let reason = args.join(' ')
        if(!reason) reason = "No reason provided."

        const embed = new MessageEmbed()
          .setAuthor(message.guild.name)
          .addFields(
              {
                  name: `Pay Respects!`,
                  value: `Press :regional_indicator_f: to pay respects`
              },
              {
                  name: `Reason`,
                  value: reason
              }
          )
          .setColor('RANDOM')
          .setFooter(`${message.author.username}`, message.author.displayAvatarURL())
          .setTimestamp()

          const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setStyle("PRIMARY")
                .setLabel('F')
                .setCustomId("F")
          )
          
          
    message.reply({
      components: [row],
      embeds: [embed]   
  })

    }
}