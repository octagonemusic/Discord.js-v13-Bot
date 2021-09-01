const { Client, ContextMenuInteraction, MessageEmbed } = require("discord.js");
const translate = require("@iamtraction/google-translate")

module.exports = {
    name: "Translate",
    type: 'MESSAGE',
    /**
     *
     * @param {Client} client
     * @param {ContextMenuInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      const msg = await interaction.channel.messages.fetch(
        interaction.targetId
      );

    //   const translated = await translate(msg.content, { to: 'en' });
    //   const embed = new MessageEmbed()
    //   .setFooter(`${interaction.user.tag}`)
    //   .setTimestamp()
    //   .addField("Text To Translate:", `\`\`\`${msg.content}\`\`\``)
    //   .addField("Translated Text:", `\`\`\`${translated.text}\`\`\``)
    //   .setColor('RANDOM')

    //   interaction.followUp({ embeds: [embed] })

      translate(msg.content, { to: 'en' }).then(res => {
        const embed = new MessageEmbed()
        .setAuthor(interaction.guild.name)
        .addField("Text To Translate:", `\`\`\`${msg.content}\`\`\``)
        .addField("Translated Text:", `\`\`\`${res.text}\`\`\``)
        .setColor("RANDOM")
        .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({dynamic: true}))
        interaction.followUp({embeds: [embed]}); 
      }).catch(err => {
        console.log(err)
      });
    },
};