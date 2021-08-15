const discord = require('discord.js')
const translate = require('@iamtraction/google-translate')

module.exports = {
    name : 'translate',
    description: "Translates the given text to English.",
    timeout: 5,
    run: async (client, message, args) => {
    
    const txt = args.join(" ")
    if(!txt) return message.reply("Please provide a text to translate!")
    translate(txt, { to: 'en' }).then(res => {
        const embed = new discord.MessageEmbed()
        .setAuthor(message.guild.name)
        .setTitle(`Translated Text`)
        .setDescription(res.text)
        .setColor("RANDOM")
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
        message.reply({embeds: [embed]}); 
      }).catch(err => {
        console.log(err)
      });

}
}