const Discord = require('discord.js'); // defining the discord modules
const fetch = require('node-superfetch')
const config = require('../../config.json')


module.exports = {
    name : "youtube",
    description: "Search for information about a particular YT Channel",
    options: [
        {
            name: "channel",
            description: 'Name of the YT Channel you want to search.',
            type: "STRING",
            required: true, 
        },
    ],
    run: async (client, interaction, args) => { 

    let [name] = args // it gonna replace " " by -
    if (!name) return interaction.editReply("please provide a valid channel name."); 



        try{
            const channel =  await fetch.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name}&key=${config.google}&maxResults=1&type=channel`)
            
    
        

            const data =  await fetch.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${channel.body.items[0].id.channelId}&key=${config.google}`)
        
            const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle('Youtube Stats')
            .setThumbnail(channel.body.items[0].snippet.thumbnails.high.url)
            .setTimestamp(new Date())
            .addField("Channel Name", channel.body.items[0].snippet.channelTitle, true)
            .addField("Channel Description", channel.body.items[0].snippet.description, true)
            .addField("Subscribers Count", parseInt(data.body.items[0].statistics.subscriberCount).toLocaleString(), true)
            .addField("Total Views", parseInt(data.body.items[0].statistics.viewCount).toLocaleString(), true)
            .addField("Total Video(s)", parseInt(data.body.items[0].statistics.videoCount).toLocaleString(), true)
            .addField("Date Created", new Date(channel.body.items[0].snippet.publishedAt).toDateString(), true)
            .addField("Link", `[${channel.body.items[0].snippet.channelTitle}](https://www.youtube.com/channel/${channel.body.items[0].id.channelId})`, true)
            .addField("Country", data.body.items[0].snippet.country ? `${data.body.items[0].snippet.country}`  : "No Country Provided", true)
            
             interaction.editReply({embeds: [embed]});
        
        } catch(err) {
            const channel =  await fetch.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name}&key=${config.google}&maxResults=1&type=channel`)
            console.log(err)
            if (!channel.body.items[0]) return interaction.editReply("No channel result. Try again.");
        }
    }
}