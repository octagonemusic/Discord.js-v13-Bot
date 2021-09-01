const { MessageEmbed } = require("discord.js")
const axios = require("axios")

module.exports = {
    name: "User Banner",
    type: "USER",
    run: async(client, interaction, args) => {

        const user = await client.users.fetch(interaction.targetId)

        axios.get(`https://discord.com/api/users/${user.id}`, {
            
            headers: {
                Authorization: `Bot ${client.token}`
            },
        })

        .then((res) => {
            const { banner, accent_color } = res.data

            if(banner)  {

                
                const extension = banner.startsWith("a_") ? '.gif' : '.png'

                
                const image = `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}?size=2048`;
               
                

                const embed = new MessageEmbed()
                .setAuthor(interaction.guild.name)
                .setTitle(`${user.tag}'s Banner`)
                .setImage(image)
                .setColor("RANDOM")
                .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL())
                interaction.followUp({embeds: [embed]})
            } else {
                if(accent_color) {
                const embed = new MessageEmbed()
                .setDescription(`${user.tag} does not have a banner, but they do have an accent color.`)
                .setColor(accent_color)

                interaction.followUp({embeds: [embed]})
                } else {
                    interaction.followUp(`${user.tag} does not have a banner nor an accent color.`)
                }
            }
        })
    }
}