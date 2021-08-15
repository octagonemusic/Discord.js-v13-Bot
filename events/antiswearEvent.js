const client = require("../index")
const words = require('../curse.json');
const { MessageEmbed } = require("discord.js")
const ms = require("ms")

client.on("messageCreate", async (message) => {

    if(message.author.bot) return
    
    const antiswearSchema = require("../schemas/antiswear-schema")

    antiswearSchema.findOne({ Guild: message.guild.id }, async (err, data) => {

        if (data) {
            const enabled = data.Enabled === 1
            if (enabled) {
                const autowarnSchema = require('../schemas/autowarn-schema')

                for (let i = 0; i < words.length; i++) {
                    if (message.content.toLowerCase().includes(words[i])) {

                        message.delete();

                        const params = {
                            guildId: message.guild.id,
                            userId: message.member.id
                        }
                        autowarnSchema.findOne(params, async (err, data) => {
                            if (data) {
                                data.warns++

                                console.log(data)
                                await autowarnSchema.findOneAndUpdate(params, data)
                                
                            let role = message.guild.roles.cache.find(r => r.name === "Muted");
                            const member = message.member
                            const Schema = require('../schemas/mute-schema')

                            const muteEmbed = new MessageEmbed()
                                .setAuthor(message.guild.name)
                                .addFields(
                                    {
                                        name: `Muted!`,
                                        value: `${message.author.tag} has been muted!`
                                    },
                                    {
                                        name: `Reason`,
                                        value: `Using banned words.`
                                    }
                                )
                                .setColor("RED")
                                .setTimestamp()

                            const unmuteEmbed = new MessageEmbed()
                            .setAuthor(message.guild.name)
                                .addFields(
                                    {
                                        name: `Unmuted!`,
                                        value: `${message.author.tag} has been unmuted, earlier muted for spamming banned words.`
                                    }
                                )
                                .setColor("GREEN")
                                .setTimestamp()
                            


                            if (data.warns === 4) {
                                if (!member.permissions.has("KICK_MEMBERS")) {
                                    member.roles.add(role)
                                    await Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
                                        if (!data) {
                                            new Schema({
                                                Guild: message.guild.id,
                                                Users: message.member.id,
                                            }).save()
                                        } else {
                                            data.Users.push(message.member.id)
                                            data.save()
                                        }
                                    })
                                    message.channel.send({embeds: [muteEmbed]})
                                    member.send({embeds: [new MessageEmbed()
                                        .setAuthor(message.guild.name)
                                        .setTitle('Muted!')
                                        .setDescription(`You have been muted in ${message.guild.name} for spamming bad words.`)
                                        .setColor('RED')
                                        .setTimestamp()]})
                                    message.guild.channels.cache.get('832524541883580426').send({embeds: [muteEmbed]})
                                    setTimeout(async function () {
                                        member.roles.remove(role)
                                        member.send(`You have now been unmuted in ${message.guild.name}.`)
                                        message.guild.channels.cache.get('832524541883580426').send({embeds: [unmuteEmbed]})
                                        await Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
                                            const user = data.Users.findIndex((prop) => prop === member.id)
                                            data.Users.splice(user, 1)
                                            data.save()
                                        })
                                    }, ms('5h'));
                                } else {
                                    return console.log('that mf is an admin/mod')
                                }
                            }

                            if (data.warns === 8) {

                                if (!member.permissions.has("KICK_MEMBERS")) {
                                    member.roles.add(role)
                                    await Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
                                        if (!data) {
                                            new Schema({
                                                Guild: message.guild.id,
                                                Users: message.member.id,
                                            }).save()
                                        } else {
                                            data.Users.push(message.member.id)
                                            data.save()
                                        }
                                    })
                                    message.channel.send({embeds: [muteEmbed]})
                                    member.send({embeds: [new MessageEmbed()
                                        .setAuthor(message.guild.name)
                                        .setTitle('Muted!')
                                        .setDescription(`You have been muted in ${message.guild.name} for spamming bad words.`)
                                        .setColor('RED')
                                        .setTimestamp()]})
                                    message.guild.channels.cache.get('832524541883580426').send({embeds: [muteEmbed]})
                                    setTimeout(async function () {
                                        member.roles.remove(role)
                                        member.send(`You have now been unmuted in ${message.guild.name}.`)
                                        message.guild.channels.cache.get('832524541883580426').send({embeds: [unmuteEmbed]})
                                        await Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
                                            const user = data.Users.findIndex((prop) => prop === member.id)
                                            data.Users.splice(user, 1)
                                            data.save()
                                        })
                                    }, ms('5h'));
                                } else {
                                    return console.log('that mf is an admin/mod.')
                                }
                            }

                            if (data.warns === 12) {
                                if (!member.permissions.has("KICK_MEMBERS")) {
                                    message.channel.send({embeds: [new MessageEmbed()
                                        .setAuthor(message.guild.name)
                                        .setTitle('Kicked!')
                                        .setDescription(`${message.author.tag} has been kicked for spamming bad words.`)
                                        .setColor('RANDOM')
                                        .setTimestamp()]})
                                        message.guild.channels.cache.get('832524541883580426').send(
                                            {embeds: [new MessageEmbed()
                                                .setAuthor(message.guild.name)
                                                .setTitle('Kicked!')
                                                .setDescription(`${message.author.tag} has been kicked for spamming bad words.`)
                                                .setColor('RANDOM')
                                                .setTimestamp()]}
                                        )
                                    member.kick(["Spamming bad words"])
                                } else {
                                    return
                                }
                            }
                            if (data.warns === 15) {
                                if (!member.permissions.has("KICK_MEMBERS")) {
                                    message.channel.send({embeds: [new MessageEmbed()
                                        .setAuthor(message.guild.name)
                                        .setTitle('Banned!')
                                        .setDescription(`${message.author.tag} has been banned for spamming bad words.`)
                                        .setColor('RANDOM')
                                        .setTimestamp()]})
                                    message.guild.channels.cache.get('832524541883580426').send({embeds: [new MessageEmbed()
                                        .setAuthor(message.guild.name)
                                        .setTitle('Banned!')
                                        .setDescription(`${message.author.tag} has been banned for spamming bad words.`)
                                        .setColor('RANDOM')
                                        .setTimestamp()]})  
                                    member.ban(["Spamming bad words"])
                                } else {
                                    return
                                }
                            }
                            } else {
                                new autowarnSchema({
                                    guildId: message.guild.id,
                                    userId: message.member.id,
                                    warns: 1,
                                }).save()
                            }
                            message.channel.send('That word is not allowed in the server!')
                            .then(msg => {
                                setTimeout(() => msg.delete(), 3000)
                              })
                                //.then(m => m.delete({ timeout: 3000 }))
                        })

                    }
                }
            } else {
                return
            }
        } else {
            return
        }
    })

})