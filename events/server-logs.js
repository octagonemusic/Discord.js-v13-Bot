const client = require("../index")
const { MessageEmbed, RoleManager, Message } = require("discord.js")
const moment = require("moment")
const ms = require("ms")
const { Emoji } = require("discord.js")
const { Role } = require("discord.js")

client.on("channelCreate", async(channel) => {
    const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first())
    console.log(entry)

    const embed = new MessageEmbed()
        .setAuthor(entry.executor.tag, entry.executor.displayAvatarURL({dynamic: true}))
        .setDescription(`A new channel was created!`)
        .addFields(
            {
                name: `Channel Name`,
                value: channel.name
            },
            {
                name: `Channel Type`,
                value: channel.type
            },
            {
                name: `Created At`,
                value: moment(channel.createdAt).format('dddd, MMMM Do YYYY, h:mm A')
            },
            {
                name: `ID`,
                value: `\`\`\`js\nChannel: ${channel.id}\nExecutor: ${entry.executor.id}\`\`\``
            }
        )
        .setColor("DARK_GREEN")

        channel.guild.channels.cache.get("832524518332825620").send({embeds: [embed]})
})

client.on("channelDelete", async(channel) => {
    const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first())
    console.log(entry)

    const embed = new MessageEmbed()
        .setAuthor(entry.executor.tag, entry.executor.displayAvatarURL({dynamic: true}))
        .setDescription(`A channel was deleted!`)
        .addFields(
            {
                name: `Channel Name`,
                value: channel.name
            },
            {
                name: `Channel Type`,
                value: channel.type
            },
            {
                name: `Created At`,
                value: `${moment(channel.createdAt).format('dddd, MMMM Do YYYY, h:mm A')} (${ms(Date.now() - channel.createdAt, { long: true })} ago)`
            },
            {
                name: `ID`,
                value: `\`\`\`js\nChannel: ${channel.id}\nExecutor: ${entry.executor.id}\`\`\``
            }
        )
        .setColor("DARK_RED")

        channel.guild.channels.cache.get("832524518332825620").send({embeds: [embed]})
})

client.on("channelUpdate", async(channel) => {
    
    if (['834401817721831444', '856458253974372373'].includes(channel.id)) 
    return;

    const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_UPDATE'}).then(audit => audit.entries.first())
    console.log(entry)

    const embed = new MessageEmbed()
        .setAuthor(entry.executor.tag, entry.executor.displayAvatarURL({dynamic: true}))
        .setDescription(`A channel was updated!`)
        .addFields(
            {
                name: `Channel Name`,
                value: channel.name
            },
            {
                name: `Channel Type`,
                value: channel.type
            },
            {
                name: `Created At`,
                value: `${moment(channel.createdAt).format('dddd, MMMM Do YYYY, h:mm A')}`
            },
            {
                name: `ID`,
                value: `\`\`\`js\nChannel: ${channel.id}\nExecutor: ${entry.executor.id}\`\`\``
            }
        )
        .setColor("YELLOW")

        channel.guild.channels.cache.get("832524518332825620").send({embeds: [embed]})
})

client.on("emojiCreate", async(emoji) => {
    const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_CREATE'}).then(audit => audit.entries.first())
    console.log(entry)

    const embed = new MessageEmbed()
        .setAuthor(entry.executor.tag, entry.executor.displayAvatarURL({dynamic: true}))
        .setDescription(`A new emoji was added to the guild! (${emoji})`)
        .addFields(
            {
                name: `Emoji Name`,
                value: emoji.name
            },
            {
                name: `Created At`,
                value: `${moment(emoji.createdAt).format('dddd, MMMM Do YYYY, h:mm A')}`
            },
            {
                name: `ID`,
                value: `\`\`\`js\nEmoji: ${emoji.id}\nExecutor: ${entry.executor.id}\`\`\``
            }
        )
        .setColor("GREEN")

        emoji.guild.channels.cache.get("832524518332825620").send({embeds: [embed]})
})

client.on("emojiDelete", async(emoji) => {
    const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_DELETE'}).then(audit => audit.entries.first())
    console.log(entry)

    const embed = new MessageEmbed()
        .setAuthor(entry.executor.tag, entry.executor.displayAvatarURL({dynamic: true}))
        .setDescription(`An emoji was deleted from the guild! (${emoji})`)
        .addFields(
            {
                name: `Emoji Name`,
                value: emoji.name
            },
            {
                name: `Created At`,
                value: `${moment(emoji.createdAt).format('dddd, MMMM Do YYYY, h:mm A')} (${ms(Date.now() - emoji.createdAt, { long: true })} ago)`
            },
            {
                name: `ID`,
                value: `\`\`\`js\nEmoji: ${emoji.id}\nExecutor: ${entry.executor.id}\`\`\``
            }
        )
        .setColor("RED")

        emoji.guild.channels.cache.get("832524518332825620").send({embeds: [embed]})
})

client.on("emojiUpdate", async(oldEmoji, newEmoji) => {
    const entry = await oldEmoji.guild.fetchAuditLogs({type: 'EMOJI_UPDATE'}).then(audit => audit.entries.first())
    console.log(entry)

    const embed = new MessageEmbed()
        .setAuthor(entry.executor.tag, entry.executor.displayAvatarURL({dynamic: true}))
        .setDescription(`An existing emoji was updated! (${newEmoji})`)
        .addFields(
            {
                name: `Before`,
                value: oldEmoji.name
            },
            {
                name: `After`,
                value: newEmoji.name
            },
            {
                name: `Created At`,
                value: `${moment(oldEmoji.createdAt).format('dddd, MMMM Do YYYY, h:mm A')}`
            },
            {
                name: `ID`,
                value: `\`\`\`js\nEmoji: ${oldEmoji.id}\nExecutor: ${entry.executor.id}\`\`\``
            }
        )
        .setColor("YELLOW")

        oldEmoji.guild.channels.cache.get("832524518332825620").send({embeds: [embed]})
})

client.on("roleCreate", async(role) => {
    const entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first())
    console.log(entry)

    const embed = new MessageEmbed()
        .setAuthor(entry.executor.tag, entry.executor.displayAvatarURL({dynamic: true}))
        .setDescription(`A new role was created!`)
        .addFields(
            {
                name: `Role Name`,
                value: role.name
            },
            {
                name: `Created At`,
                value: `${moment(role.createdAt).format('dddd, MMMM Do YYYY, h:mm A')}`
            },
            {
                name: `ID`,
                value: `\`\`\`js\nRole: ${role.id}\nExecutor: ${entry.executor.id}\`\`\``
            }
        )
        .setColor("GREEN")

        role.guild.channels.cache.get("832524518332825620").send({embeds: [embed]})
})

client.on("roleDelete", async(role) => {
    const entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first())
    console.log(entry)

    const embed = new MessageEmbed()
        .setAuthor(entry.executor.tag, entry.executor.displayAvatarURL({dynamic: true}))
        .setDescription(`An role was deleted from the guild!`)
        .addFields(
            {
                name: `Role Name`,
                value: role.name
            },
            {
                name: `Created At`,
                value: `${moment(role.createdAt).format('dddd, MMMM Do YYYY, h:mm A')} (${ms(Date.now() - role.createdAt, { long: true })} ago)`
            },
            {
                name: `ID`,
                value: `\`\`\`js\nRole: ${role.id}\nExecutor: ${entry.executor.id}\`\`\``
            }
        )
        .setColor("RED")

        role.guild.channels.cache.get("832524518332825620").send({embeds: [embed]})
})

client.on("roleUpdate", async(oldRole, newRole) => {
    const entry = await oldRole.guild.fetchAuditLogs({type: 'ROLE_UPDATE'}).then(audit => audit.entries.first())
    console.log(entry)

    const embed = new MessageEmbed()
        .setAuthor(entry.executor.tag, entry.executor.displayAvatarURL({dynamic: true}))
        .setDescription(`An existing role was updated!`)
        .addFields(
            {
                name: `Before`,
                value: oldRole.name
            },
            {
                name: `After`,
                value: newRole.name
            },
            {
                name: `Created At`,
                value: `${moment(oldRole.createdAt).format('dddd, MMMM Do YYYY, h:mm A')}`
            },
            {
                name: `ID`,
                value: `\`\`\`js\nRole: ${newRole.id}\nExecutor: ${entry.executor.id}\`\`\``
            }
        )
        .setColor("YELLOW")

        oldRole.guild.channels.cache.get("832524518332825620").send({embeds: [embed]})
})

client.on("guildUpdate", async(oldGuild, newGuild) => {

    const entry = await oldGuild.fetchAuditLogs({type: 'GUILD_UPDATE'}).then(audit => audit.entries.first())
    console.log(entry)
    
    if(oldGuild.name !== newGuild.name) {
        const embed = new MessageEmbed()
            .setAuthor(entry.executor.tag, entry.executor.displayAvatarURL({dynamic: true}))
            .setDescription(`Guild Name was changed!`)
            .addFields(
                {
                    name: `Before`,
                    value: oldGuild.name
                },
                {
                    name: `After`,
                    value: newGuild.name
                },
                {
                    name: `ID`,
                    value: `\`\`\`js\nExecutor: ${entry.executor.id}\nGuild: ${newGuild.id}\`\`\``
                }
            )
            .setColor("RANDOM")

            oldGuild.channels.cache.get("832524518332825620").send({embeds: [embed]})
    }

    if(oldGuild.vanityURLCode !== newGuild.vanityURLCode){
        const embed = new MessageEmbed()
            .setAuthor(entry.executor.tag, entry.executor.displayAvatarURL({dynamic: true}))
            .setDescription(`Guild Vanity URL was changed!`)
            .addFields(
                {
                    name: `Before`,
                    value: oldGuild.vanityURLCode
                },
                {
                    name: `After`,
                    value: newGuild.vanityURLCode
                },
                {
                    name: `ID`,
                    value: `\`\`\`js\nExecutor: ${entry.executor.id}\nGuild: ${newGuild.id}\`\`\``
                }
            )
            .setColor("RANDOM")

            oldGuild.channels.cache.get("832524518332825620").send({embeds: [embed]})
    }

    if(oldGuild.icon !== newGuild.icon) {
        const embed = new MessageEmbed()
            .setAuthor(entry.executor.tag, entry.executor.displayAvatarURL({dynamic: true}))
            .setDescription("Guild Icon was changed!")
            .setImage(newGuild.iconURL({dynamic: true, size: 256}))
            .setColor("RANDOM")

            oldGuild.channels.cache.get("832524518332825620").send({embeds: [embed]})
    }

    if(oldGuild.afkChannel !== newGuild.afkChannel){
        const embed = new MessageEmbed()
            .setAuthor(entry.executor.tag, entry.executor.displayAvatarURL({dynamic: true}))
            .setDescription(`AFK Channel was updated!`)
            .addFields(
                {
                    name: `Before`,
                    value: oldGuild.afkChannel.name
                },
                {
                    name: `After`,
                    value: newGuild.afkChannel.name
                },
                {
                    name: `ID`,
                    value: `\`\`\`js\nUser: ${entry.executor.id}\nAFK Channel: ${newGuild.afkChannel.id}\nGuild: ${newGuild.id}\`\`\``
                }
            )
            .setColor("RANDOM")

            oldGuild.channels.cache.get("832524518332825620").send({embeds: [embed]})
    }

    if(oldGuild.verificationLevel !== newGuild.verificationLevel){
        const embed = new MessageEmbed()
            .setAuthor(entry.executor.tag, entry.executor.displayAvatarURL({dynamic: true}))
            .setDescription(`AFK Timeout was updated!`)
            .addFields(
                {
                    name: `Before`,
                    value: `${oldGuild.verificationLevel/60} minutes`
                },
                {
                    name: `After`,
                    value: `${newGuild.verificationLevel/60} minutes`
                },
                {
                    name: `ID`,
                    value: `\`\`\`js\nUser: ${entry.executor.id}\nAFK Channel: ${newGuild.afkChannel.id}\nGuild: ${newGuild.id}\`\`\``
                }
            )
            .setColor("RANDOM")

            oldGuild.channels.cache.get("832524518332825620").send({embeds: [embed]})
    }

    if(oldGuild.verificationLevel !== newGuild.verificationLevel){
        const embed = new MessageEmbed()
            .setAuthor(entry.executor.tag, entry.executor.displayAvatarURL({dynamic: true}))
            .setDescription(`AFK Timeout was updated!`)
            .addFields(
                {
                    name: `Before`,
                    value: oldGuild.verificationLevel
                },
                {
                    name: `After`,
                    value: newGuild.verificationLevel
                },
                {
                    name: `ID`,
                    value: `\`\`\`js\nUser: ${entry.executor.id}\nGuild: ${newGuild.id}\`\`\``
                }
            )
            .setColor("RANDOM")

            oldGuild.channels.cache.get("832524518332825620").send({embeds: [embed]})
    }

})