const discord = require('discord.js'); 
const moment = require("moment");

module.exports = { 

name : 'Author Info',
type: "MESSAGE",
run: async (client, interaction, args) => {

    
    const msg = await interaction.channel.messages.fetch(interaction.targetId)
    

    
    var game = msg.member.presence.game 

    
    var status = msg.member.presence.status;
    if(status == 'dnd') status = "Do Not Disturb"
    if(status == 'online') status = "Online"
    if(status == 'offline') status = "Offline"
    if(status === 'idle') status = "Idle"

    
    const roles = msg.member.roles.cache 
    .sort((a, b) => b.position - a.position)
    .map(role => role.toString())
    .slice(0, -1);

    let displayRoles;

    if(roles.length < 25) {
        displayRoles = roles.join(' ')
        if(roles.length < 1) displayRoles = "None" 

    } else {

        
        displayRoles = roles.slice(20).join(' ')
    }

    
    const userEmbed = new discord.MessageEmbed() 
     .setAuthor(`User information of ${msg.author.username}`, msg.author.displayAvatarURL({dynamic: true, size: 2048})) 
     .addField(`**Tag: **`, `${msg.author.tag}`) 
     .addField(`**Username: **`, msg.author.username || "None")  
     .addField(`**ID: **`, `${msg.author.id}`) 
     .addField(`**Avatar: **`, `[Click here to view Avatar](${msg.author.displayAvatarURL({ dynamic: true})})`) 
     .addField(`**Status: **`, `${status}`) 
     .addField(`**Game: **`, `${game || 'None'}`) 
     .addField(`**Account Created At: **`, `${moment(msg.author.createdAt).format("DD-MM-YYYY [at] HH:mm")}`)
     .addField(`**Joined The Server At: **`, `${moment(msg.author.joinedAt).format("DD-MM-YYYY [at] HH:mm")}`) 
     .addField(`**Roles: [${roles.length}]**`, `${displayRoles}`) 
     .setColor("RANDOM")
     .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
    interaction.followUp({embeds: [userEmbed]}) 
    
}
}