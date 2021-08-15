const Discord = require('discord.js')

module.exports = {
	
	name: 'ship',
    description: 'Shows your affinity with the mentioned user.', 
    timeout: 5, 
    usage: "<member>",
    run: async (client, message, args) => {
   
        const block = "⬛";
        const heart = ":red_square:";//put your own block emoji if you have smth
        const { MessageEmbed } = require("discord.js")
        
       
         const user = message.mentions.users.first();
            if (!user) return message.reply(`Please specify a user to ship with!`)
             if(user && user.id === message.author.id) {
             return message.reply("Bruh you want to ship yourself, how lonely are you?")
             }
        if (message.mentions.users.size < 2) {
            let loveEmbed = new MessageEmbed()
                .setColor('dd2e44')
                .setTitle('Shipping...')
                .setDescription(`Shipped ${message.author} and ${user}!`)
                .setImage(`https://api.popcatdev.repl.co/ship?user1=${message.author.displayAvatarURL({ dynamic: false, format: "png" })}&user2=${user.displayAvatarURL({ dynamic: false, format: "png" })}`)
                .addField(`**Ship Meter**`, ship())
                
           return message.reply({embeds: [loveEmbed]})
        } else if (message.mentions.users.size > 1) {
        let luv = new MessageEmbed()
                .setColor('dd2e44')
                .setTitle('Shipping...')
                .setDescription(`Shipped ${message.mentions.users.first()} and ${message.mentions.users.last()}!`)
                .setImage(`https://api.popcatdev.repl.co/ship?user1=${message.mentions.users.first().displayAvatarURL({ dynamic: false, format: "png" })}&user2=${message.mentions.users.last().displayAvatarURL({ dynamic: false, format: "png" })}`)
                .addField(`**Ship Meter**`, ship())
            message.reply({embeds: [luv]})
        }
        
        function ship() {
            const hearts = Math.floor(Math.random() * 100) + 1;
            const hearte = (hearts/10)
          
            const str = `${heart.repeat(hearte)}${block.repeat(11 - hearte)} ${hearts}%`;
            return str; 
        }
}
}