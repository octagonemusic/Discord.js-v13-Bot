const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'spotify',
    description: `Check the specified user's spotify status`,
    run: (client, message, args) => {
        if (!message.guild.me.permissions.has("SEND_MESSAGES")) return;
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
        user.presence.activities.forEach((activity) => {
       if (activity.type === 'LISTENING' && activity.name === 'Spotify' && activity.assets !== null) {
     
                let trackIMG = `https://i.scdn.co/image/${activity.assets.largeImage.slice(8)}`;
                let trackURL = `https://open.spotify.com/track/${activity.syncId}`;

                let trackName = activity.details;
                let trackAuthor = activity.state;
                let trackAlbum = activity.assets.largeText;

                trackAuthor = trackAuthor.replace(/;/g, ",")

                const embed = new MessageEmbed()
                  .setAuthor('Spotify Track Info', 'https://cdn.discordapp.com/emojis/408668371039682560.png')
                  .setTitle(trackName)
                  .setURL(trackURL)
                  .setColor("GREEN")
                  .setThumbnail(trackIMG)
                  .addField('Song Name', `\`\`\`json\n"${trackName}"\n\`\`\``, true)
                  .addField('Album', `\`\`\`json\n"${trackAlbum}"\n\`\`\``, true)
                  .addField('Author', `\`\`\`json\n"${trackAuthor}"\n\`\`\``, true)
                  .addField('Listen to Track', `${`\`\`\`json\n"${trackURL}"\n\`\`\``}`, false)
                  .setFooter(user.displayName, user.user.displayAvatarURL({ dynamic: true }))
               message.reply({embeds: [embed]});
            }})
        
        }
    }