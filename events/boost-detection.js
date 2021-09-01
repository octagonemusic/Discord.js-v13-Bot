const { MessageEmbed, Message } = require("discord.js");
const client = require("..");

client.on("guildMemberUpdate", async(oldMember, newMember) => {
    const oldStatus = oldMember.premiumSince
    const newStatus = newMember.premiumSince

    if(!oldStatus && newStatus) {
        client.channels.cache
            .get("832478617254101042")
            .send({ embeds: [
                new MessageEmbed()
                    .setAuthor(oldMember.guild.name)
                    .setTitle("New Boost!")
                    .setDescription(`${newMember.user.tag} has boosted the server!`)
                    .setFooter("Thank you for boosting!", newMember.user.displayAvatarURL({ dynamic: true }))
                    .setColor("LUMINOUS_VIVID_PINK")
                    .setTimestamp()
            ]})
    }

    if(oldStatus && !newStatus) {
        client.channels.cache
        .get("832478617254101042")
            .send({ embeds: [
                new MessageEmbed()
                    .setAuthor(oldMember.guild.name)
                    .setTitle("Unboost!")
                    .setDescription(`${newMember.user.tag} has unboosted the server!`)
                    .setFooter("Thank you for boosting all this while!", newMember.user.displayAvatarURL({ dynamic: true }))
                    .setColor("RED")
                    .setTimestamp()
            ]})
    }
})