const client = require("../index")
const { MessageEmbed } = require("discord.js")

client.on("messageDelete", async (message) => {

    if(message.author.bot) return ;
    if(!message.guild.id === "832467028802797578") return
    let string = message.content
    let content = string.substring(0,900) + `...`
    if (!string) content = "No text content"

    const embed = new MessageEmbed()
        .setAuthor(message.author.tag)
        .setDescription(`**Message deleted in <#${message.channel.id}>**`)
        .addFields(
            {
                name: `Content`,
                value: content
            },
            {
                name: `ID`,
                value: `\`\`\`js\nUserID: ${message.author.id}\nMessageID: ${message.id}\`\`\``
            }
        )
        .setImage(message.attachments.first() ? message.attachments.first().proxyURL : null)
        .setColor("RED")
        .setTimestamp()

    message.guild.channels.cache.get("832524518332825620").send({ embeds: [embed] })

})

client.on("messageUpdate", async (oldMessage, newMessage) => {

    if(oldMessage.author.bot) return ;
    if(!oldMessage.guild.id === "832467028802797578") return

    
    let string = oldMessage.content
    let oldmsg = string.substring(0,900) + `...`
    if (!string) oldmsg = "No text content."

    
    let string1 = newMessage.content
    let newmsg = string1.substring(0,900) + `...`
    if (!string1) newmsg = "No text content."

    const embed = new MessageEmbed()
        .setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Message updated in <#${oldMessage.channel.id}>`)
        .addFields({
            name: `Before`,
            value: oldmsg
        },
            {
                name: `After`,
                value: newmsg,
            },

            {
                name: `ID`,
                value: `\`\`\`js\nUserID: ${oldMessage.author.id}\nMessageID: ${oldMessage.id}\`\`\``
            })
        .setImage(oldMessage.attachments.first() ? oldMessage.attachments.first().proxyURL : null)
        .setColor("YELLOW")
        .setTimestamp()

    oldMessage.guild.channels.cache.get("832524518332825620").send({ embeds: [embed] })
})