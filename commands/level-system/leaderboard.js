const Discord = require('discord.js');
const Levels = require('discord-xp');

module.exports = {
    name: "leaderboard",
    aliases: ["top", "lb"],
    description: "Shows the top 10 users with most XP.",
    timeout: 5,


    run: async (client, message, args) => {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.

        if (rawLeaderboard.length < 1) return message.reply("Nobody's in leaderboard yet.");

        const leaderboard = await Levels.computeLeaderboard(message.client, rawLeaderboard); // We process the leaderboard.

        const lb = leaderboard.map(e => `**${e.position}. __${e.username}#${e.discriminator}__\n__Level:__ ${e.level}\n__XP:__ ${e.xp.toLocaleString()}**`); // We map the outputs.

        const embed =  new Discord.MessageEmbed()
        .setAuthor(message.guild.name)
        .setColor("RANDOM")
        .setTitle("LEADERBOARD")
        .setDescription(lb.join("\n\n"))
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
        .setTimestamp()

        message.reply({embeds: [embed]});
    }
}