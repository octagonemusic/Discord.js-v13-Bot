const client = require("../index")
const { MessageEmbed } = require("discord.js")

client.on("guildMemberUpdate", async(oldMember, newMember) => {
    
    if(!oldMember.guild.id === "832467028802797578") return
    
    const entry = await oldMember.guild.fetchAuditLogs({type: 'MEMBER_ROLE_UPDATE'}).then(audit => audit.entries.first())
    console.log(entry)

    let oldRoleIDs = [];
    oldMember.roles.cache.each(role => {
        console.log(role.name, role.id);
        oldRoleIDs.push(role.id);
    });
    let newRoleIDs = [];
    newMember.roles.cache.each(role => {
        console.log(role.name, role.id);
        newRoleIDs.push(role.id);
    })

  if(newRoleIDs.length > oldRoleIDs.length) {
    function filterOutOld(id) {
        for (var i = 0; i < oldRoleIDs.length; i++) {
            if (id === oldRoleIDs[i]) {
                return false;
            }
        }
        return true;
    }
    let onlyRole = newRoleIDs.filter(filterOutOld);

    let IDNum = onlyRole[0];

  const embed = new MessageEmbed()
    .setAuthor(`${entry.target.username}#${entry.target.discriminator}`, entry.target.displayAvatarURL({dynamic: true}))
    .setTitle("Role Update")
    .setDescription(`${entry.target.tag}'s roles have been updated!`)
    .addFields(
        {
            name: `<:plussign:874530281263083521> Role Added`,
            value: `<@&${IDNum}>`,
        },
        {
            name: `Executor`,
            value: entry.executor.tag
        },
        {
            name: `ID`,
            value: `\`\`\`js\nUser = ${entry.target.id}\nRole = ${IDNum}\nGuild = ${oldMember.guild.id}\`\`\``
        }
    )
    .setFooter(entry.executor.tag, entry.executor.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    .setColor("GREEN")

    oldMember.guild.channels.cache.get("832524518332825620").send({embeds: [embed]})
  } else if(oldRoleIDs.length > newRoleIDs.length) {
    oldMember.roles.cache.forEach(role => {
        if (!newMember.roles.cache.has(role.id)) {

            const embed = new MessageEmbed()
                .setAuthor(entry.target.tag, entry.target.displayAvatarURL({ dynamic: true }))
                .setTitle("Role Update")
                .setDescription(`${entry.target.tag}'s roles have been updated!`)
                .addFields(
                    {
                        name: `❌ Role Removed`,
                        value: `<@&${role.id}>`
                    },
                    {
                        name: `Executor`,
                        value: entry.executor.tag
                    },
                    {
                        name: `ID`,
                        value: `\`\`\`js\nUser = ${entry.target.id}\nRole = ${role.id}\nGuild = ${oldMember.guild.id}\`\`\``
                    }
                )
                .setFooter(entry.executor.tag, entry.executor.displayAvatarURL({dynamic: true}))
                .setTimestamp()
                .setColor("RED")
            oldMember.guild.channels.cache.get("832524518332825620").send({embeds: [embed]})
        }
    })
  }
})

client.on("guildMemberUpdate", async(oldMember, newMember) => {

    if(!oldMember.guild.id === "832467028802797578") return

    if(oldMember.nickname !== newMember.nickname) {
        const entry = await oldMember.guild.fetchAuditLogs({type: 'MEMBER_UPDATE'}).then(audit => audit.entries.first())
        console.log(entry)

        let oldnick = oldMember.nickname
        if(!oldnick) oldnick = oldMember.user.username

        let newnick = newMember.nickname
        if(!newnick) newnick = newMember.user.username

        const embed = new MessageEmbed()
            .setAuthor(entry.target.tag, entry.target.displayAvatarURL({dynamic: true}))
            .setDescription(`${oldMember}'s Nickname was changed`)
            .addFields(
                {
                    name: `Before`,
                    value: oldnick
                },
                {
                    name: `After`,
                    value: newnick
                },
                {
                    name: `Executor`,
                    value: entry.executor.tag
                },
                {
                    name: `ID`,
                    value: `\`\`\`js\nUser = ${entry.target.id}\n\nGuild = ${oldMember.guild.id}\`\`\``
                }
            )
            .setColor("RANDOM")
            .setFooter(entry.executor.tag, entry.executor.displayAvatarURL({dynamic: true}))
            .setTimestamp()

            oldMember.guild.channels.cache.get("832524518332825620").send({embeds: [embed]})

    } else {
        return 
    }
})
