const client = require("../index")
const { MessageEmbed } = require("discord.js")

client.on("guildBanAdd", async(guild, user) => {
    

    const entry = await guild.guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())
    console.log(entry)

    if(entry.executor.id === client.user.id) return

    const embed = new MessageEmbed()
        .setAuthor(entry.target.tag, entry.target.displayAvatarURL({dynamic: true}))
        .setDescription(`${entry.target.tag} has been banned`)
        .addFields(
            {
                name: `User Information`,
                value: `${entry.target.tag} (${entry.target.id})`
            },
            {
                name: `Banned by`,
                value: entry.executor.tag
            },
            {
                name: `Reason`,
                value: entry.reason || "None"
            },
            {
                name: `ID`,
                value: `\`\`\`js\nUser = ${entry.target.id}\nExecutor = ${entry.executor.id}\nGuild = ${guild.guild.id}\`\`\``
            }
        )
        .setColor("RED")

        guild.guild.channels.cache.get("832524541883580426").send({embeds: [embed]})
})

client.on("guildBanRemove", async(guild, user) => {
    

    const entry = await guild.guild.fetchAuditLogs({type: 'MEMBER_BAN_REMOVE'}).then(audit => audit.entries.first())
    console.log(entry)

    const embed = new MessageEmbed()
        .setAuthor(entry.target.tag, entry.target.displayAvatarURL({dynamic: true}))
        .setDescription(`${entry.target.tag} has been unbanned`)
        .addFields(
            {
                name: `User Information`,
                value: `${entry.target.tag} (${entry.target.id})`
            },
            {
                name: `Unbanned by`,
                value: entry.executor.tag
            },
            {
                name: `Reason`,
                value: entry.reason || "None"
            },
            {
                name: `ID`,
                value: `\`\`\`js\nUser = ${entry.target.id}\nExecutor = ${entry.executor.id}\nGuild = ${guild.guild.id}\`\`\``
            }
        )
        .setColor("GREEN")

        guild.guild.channels.cache.get("832524541883580426").send({embeds: [embed]})
})

client.on("guildMemberRemove", async(member) => {
    const entry = await member.guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_KICK',
    });
    // Since we only have 1 audit log entry in this collection, we can simply grab the first one
    const kickLog = entry.entries.first();

    // Let's perform a sanity check here and make sure we got *something*
    if (!kickLog) return console.log(`${member.user.tag} left the guild, most likely of their own will.`);

    // We now grab the user object of the person who kicked our member
    // Let us also grab the target of this action to double check things
    const { executor, target, reason } = kickLog;

    if (kickLog.createdAt < member.joinedAt) { 
        return console.log(`${member.user.tag} left the guild, most likely of their own will.`);
    }

    // And now we can update our output with a bit more information
    // We will also run a check to make sure the log we got was for the same kicked member
    if (target.id === member.id) {
        const embed = new MessageEmbed()
        .setAuthor(target.tag, target.displayAvatarURL({dynamic: true}))
        .setDescription(`${target.tag} has been kicked`)
        .addFields(
            {
                name: `User Information`,
                value: `${target.tag} (${target.id})`
            },
            {
                name: `Kicked by`,
                value: executor.tag
            },
            {
                name: `Reason`,
                value: reason || "None"
            },
            {
                name: `ID`,
                value: `\`\`\`js\nUser = ${target.id}\nExecutor = ${executor.id}\nGuild = ${member.guild.id}\`\`\``
            }
        )
        .setColor("RED")

        member.guild.channels.cache.get("832524541883580426").send({embeds: [embed]})
    } else {
        console.log(`${member.user.tag} left the guild, audit log fetch was inconclusive.`);
    }
})

