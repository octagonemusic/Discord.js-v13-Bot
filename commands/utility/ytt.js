const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const fetch = require('node-fetch')


module.exports = {

    name: "yt-together",
    aliases: ["yt-t", "yttogether", "ytt"],
    description: "Use this command to watch youtube together with friends!",
    
    run: async (client, message, args) => {
        const { guild } = message

    let channel = message.member.voice.channel;
    if(!channel) return message.reply("You have to be in a vc")

    fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
        method: "POST",
        body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: "755600276941176913",
            target_type: 2,
            temporary: false,
            validate: null
        }),
        headers: {
            "Authorization": `Bot ${client.token}`,
            "Content-Type": "application/json"
        }
    })
    
    .then(res => res.json())
    .then(invite => {
        if(!invite.code) return message.reply("Sadly I was unable to start a YouTube Together activity.")
        const e = new MessageEmbed()
        .setAuthor(guild.name)
        .setTitle(`__YouTube Together__!`)
        .setDescription(`**Click the button below to watch YouTube Together!**`)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp()
        .setColor('RED')
        const row = new MessageActionRow().addComponents(
            new MessageButton()
            .setStyle("LINK")
            .setLabel('Click to watch together!')
            .setURL(`https://discord.com/invite/${invite.code}`)
        )

        message.reply({
          components: [row],
          embeds: [e]
      })
    })
}
}