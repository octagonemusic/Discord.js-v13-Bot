const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "firstmessage",
  description: "Fetches the first message in the channel the command is used in.",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const fetchMessages = await interaction.channel.messages.fetch({
      after: 1,
      limit: 1,
    });
    const msg = fetchMessages.first();

    interaction.followUp(
      {embeds: [new MessageEmbed()
        .setAuthor(interaction.guild.name)
        .setTitle(`First Messsage in ${interaction.guild.name}`)
        .setURL(msg.url)
        .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
        .setDescription("Content: " + msg.content)
        .addField("Author", msg.author.tag, true)
        .addField('Message ID', msg.id, true)
        .addField('Created At', msg.createdAt.toLocaleDateString(), true)
        .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))]}
    );
  },
};