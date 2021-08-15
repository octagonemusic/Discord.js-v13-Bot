const Discord = require('discord.js');
const Levels = require('discord-xp');
const canvacord = require('canvacord');

module.exports = {
   name: "rank",
   aliases: ["level", "lvl"],
   description: "Shows your's or the mentioned user's rank and level in this server",
   usage: "<member>",
    timeout: 5,
    run: async (client, message, args) => {
        const target = message.mentions.users.first() || message.author; // Grab the target.

        const user = await Levels.fetch(target.id, message.guild.id, true); // Selects the target from the database.

        if (!user) return message.reply("Seems like this user has not earned any xp so far."); // If there isnt such user in the database, we send a message in general.

        const neededXp = Levels.xpFor(parseInt(user.level) + 1)

        const img = "https://i.imgur.com/ODjTnGz.jpeg"; //700px x 250px

        const rank = new canvacord.Rank()
            .setAvatar(target.displayAvatarURL({ dynamic: false, format: 'png' }))
            .setBackground("IMAGE", img)
            .setRank(user.position)
            .setLevel(user.level)
            .setCurrentXP(user.xp)
            .setRequiredXP(neededXp)
            .setProgressBar( ["#ffffff", "#ff0000"], "GRADIENT")
            .setUsername(target.username)
            .setDiscriminator(target.discriminator);

        rank.build()
            .then(data => {
                const attachment = new Discord.MessageAttachment(data, "RankCard.png");
                message.reply({files: [attachment]});
            });
    }
}