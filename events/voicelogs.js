const client = require("../index")
const { MessageEmbed } = require("discord.js")

client.on("voiceStateUpdate", async(oldMember, newMember) => {
        if(!oldMember.channel && newMember.channel) {

            const embed = new MessageEmbed()
                .setAuthor(oldMember.member.user.tag, oldMember.member.user.displayAvatarURL({dynamic: true}))
                .setTitle(`Member joined Voice Channel`)
                .setDescription(`${newMember.member.user} joined ${newMember.channel.name}`)
                .setTimestamp()
                .setColor("GREEN")

            oldMember.guild.channels.cache.get("832524518332825620").send({embeds: [embed]})

            //`${newMember.member.user} joined ${newMember.channel.name}`
             
        } else if(oldMember.channel && newMember.channel && oldMember.channel?.id !== newMember.channel?.id) {
          
            const embed = new MessageEmbed()
                .setAuthor(oldMember.member.user.tag, oldMember.member.user.displayAvatarURL({dynamic: true}))
                .setTitle(`Member switched Voice Channels`)
                .setDescription(`${newMember.member.user} switched from ${oldMember.channel.name} to ${newMember.channel.name}`)
                .setTimestamp()
                .setColor("YELLOW")

            oldMember.guild.channels.cache.get("832524518332825620").send({embeds: [embed]})
            //`${newMember.member.user} switched from ${oldMember.channel.name} to ${newMember.channel.name}`
             
        } else if(oldMember.channel && !newMember.channel) {

            const embed = new MessageEmbed()
            .setAuthor(oldMember.member.user.tag, oldMember.member.user.displayAvatarURL({dynamic: true}))
            .setTitle(`Member left Voice Channel`)
            .setDescription(`${newMember.member.user} left ${oldMember.channel.name}`)
            .setTimestamp()
            .setColor("RED")

            oldMember.guild.channels.cache.get("832524518332825620").send({embeds: [embed]})
            //`${newMember.member.user} left ${oldMember.channel.name}`
        }
})