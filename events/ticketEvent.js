const client = require("../index")
const{ MessageEmbed } = require("discord.js")

client.on("interactionCreate", async(interaction) => {
    if(interaction.isButton()) {
        if(interaction.customId === "ticket") {
            await interaction.deferReply({ ephemeral: true }).catch(() => {});
            const {guild} = interaction
            
            const channel = await interaction.guild.channels.create(`ticket: ${interaction.user.tag}`);
            channel.setParent("844439728669196288");
  
      channel.permissionOverwrites.edit(interaction.guild.id, {
        SEND_MESSAGES: false,
        VIEW_CHANNEL: false,
      });
      channel.permissionOverwrites.edit(interaction.user, {
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true,
      });
  
      const reactionMessage = await channel.send(
          
       {embeds: [ new MessageEmbed()
        .setAuthor(guild.name)
        .setTitle('__New Ticket!__')
        .setDescription(`🎟 **Thank you for opening a ticket! One of our staff members will be with you shortly.**\n\n🎟 **In the meanwhile, please feel free to type your request below!**`) 
        .setFooter(`Ticket opened by ${interaction.user.tag}`, interaction.user.displayAvatarURL())
        .setColor("RANDOM")]}
        );
  
      try {
        await reactionMessage.react("🔒");
        await reactionMessage.react("⛔");
      } catch (err) {
        channel.send("Error sending emojis!");
        throw err;
      }
  
      const collector = reactionMessage.createReactionCollector(
        (reaction, user) => interaction.guild.members.cache.find((member) => member.id === user.id).permissions.has("KICK_MEMBERS"),
        { dispose: true }
      );
  
      collector.on("collect", (reaction, user) => {
          if(user.bot) return
        switch (reaction.emoji.name) {
          case "🔒":
                      channel.send("🔒 **| This ticket has been closed!**")
            channel.permissionOverwrites.edit(interaction.user, { SEND_MESSAGES: false });
            break;
          case "⛔":
            channel.send("⛔ **| Deleting this channel in 5 seconds!**");
            setTimeout(() => channel.delete(), 5000);
            break;
        }
      });
  
      interaction.editReply(`We will be right with you! ${channel}`)
        .catch((err) => {
          throw err;
        });

        }
    }
})