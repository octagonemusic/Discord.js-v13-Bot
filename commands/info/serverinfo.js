const { MessageEmbed } = require("discord.js");
const moment = require('moment')
module.exports = {
  name: "serverinfo",
  description: "Get The Full Info Of Server",
  usage: "",
  aliases: ["si"],
   run: async (client, message, args) => {
    let embed = new MessageEmbed()
    .setTitle("**Server Information**")
        .setColor('GREEN')
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setAuthor(message.guild.name, message.guild.iconURL)
        .addField("Name", message.guild.name, true)
        .addField("ID", message.guild.id, true)
        .addField("Owner", `${(await message.client.users.fetch(message.guild.ownerId)).tag}`, true)
       // .addField('#️⃣ Owner ID:', `${(await message.guild.ownerId)}`, true)
        .addField(`Members`, message.guild.memberCount.toString(), true)
        .addField(`Bots:`, message.guild.members.cache.filter(member => member.user.bot).size.toString(), true)
        .addField(`Non-Animated Emojis:`, message.guild.emojis.cache.size.toString(), true)
        .addField(`Animated Emojis:`,message.guild.emojis.cache.filter(emoji => emoji.animated).size.toString(),true )
        .addField(`Text Channels:`,message.guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size.toString(),true )
        .addField(`Voice Channels:`,message.guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size.toString(),true )
        .addField(`Roles:`, message.guild.roles.cache.size.toString(), true)
        .addField(`Created at`, `${moment(message.guild.createdTimestamp).format('LLL')} | \`${moment(message.guild.createdTimestamp).fromNow()}\``, true)
        .addField(`Boost Level`, message.guild.premiumTier.toString(), true)
        .addField(`Total Boosts`, message.guild.premiumSubscriptionCount.toString(), true)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
    message.reply({embeds: [embed]});
}
}