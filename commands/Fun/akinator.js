const emojis = ["👍", "👎", "❔", "🤔", "🙄"];
const isPlaying = new Set();
const { Aki } = require("aki-api");
const {MessageEmbed} = require("discord.js")

module.exports = { 

    name: 'akinator',
    aliases: ['aki'],
    timeout: 5,
    description: "Starts a game of Akinator", 
    run: async(client, message, args) => {
      
        if (isPlaying.has(message.author.id)) {
            return message.reply(":x: | The game already started.");
          }
      
          isPlaying.add(message.author.id);
      
          const region = 'en';
            const childMode = false;
            const proxy = undefined;
          const aki = new Aki({region, childMode, proxy}); // Full languages list at: https://github.com/jgoralcz/aki-api
      
          await aki.start();
      
          const msg = await message.reply({embeds: [new MessageEmbed()
            .setAuthor(`${message.author.username}, Question ${aki.currentStep + 1}`)
            .setTitle(aki.question)
            .setColor("RANDOM")
            .setDescription(`${aki.answers.map((an, i) => `**${an}** | ${emojis[i]}`).join("\n\n")}`)
            .setFooter("Please wait for all the reactions to be added.")]});
      
          for (const emoji of emojis) await msg.react(emoji);
      
          const collector = msg.createReactionCollector((reaction, user) => emojis.includes(reaction.emoji.name) && user.id == message.author.id, {
            time: 60000 * 6
          });
      
          collector
            .on("end", () => isPlaying.delete(message.author.id))
            .on("collect", async ({
              emoji,
              users
            }) => {
              users.remove(message.author).catch(() => null);
      
              await aki.step(emojis.indexOf(emoji.name));
      
              if (aki.progress >= 70 || aki.currentStep >= 78) {
      
                await aki.win();
      
                collector.stop();
      
                message.reply({embeds: [new MessageEmbed()
                  .setTitle("Is this your character?")
                  .setDescription(`**${aki.answers[0].name}**\n${aki.answers[0].description}\nRanking as **#${aki.answers[0].ranking}**\n\n[yes (**y**) / no (**n**)]`)
                  .setImage(aki.answers[0].absolute_picture_path)
                  .setColor("RANDOM")]});
      
                const filter = m => /(yes|no|y|n)/i.test(m.content) && m.author.id == message.author.id;
      
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 30000,
                    errors: ["time"]
                  })
                  .then(collected => {
                    const isWinner = yes || y;
                    message.reply({embeds: [new MessageEmbed()
                      .setTitle(isWinner ? "Great! Guessed right one more time." : "Congratulations! You have beaten me, but I'll get you the next time!")
                      .setColor("RANDOM")
                      .setDescription("I love playing with you!")]});
                  }).catch(() => null);
              
              } else {
                msg.edit({embeds: [new MessageEmbed()
                  .setAuthor(`${message.author.username}, Question ${aki.currentStep + 1}`)
                  .setTitle(aki.question)
                  .setColor("RANDOM")
                  .setDescription(`${aki.answers.map((an, i) => `**${an}** | ${emojis[i]}`).join("\n\n")}`)]});
              }
            })
  }
}