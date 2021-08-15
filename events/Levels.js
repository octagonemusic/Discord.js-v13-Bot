const client = require("../index")
const { MessageEmbed } = require("discord.js")
const Levels = require('discord-xp');
const { mongoPath } = require("../config.json")
Levels.setURL(mongoPath)

client.on("messageCreate", async(message) => {

  if(message.author.bot) return
    if (['832479757781827624', '832975056442228797', '832515573991866410', '832520603872657408', '832520734458642482', '832520693559722003', '832523883500273684', '832521864513060904', '832991484268773396'].includes(message.channel.id)) {
        return;
      } else {
        const randomAmountOfXp = 5 // Min 1, Max 30
        const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);

        const lvl = await Levels.fetch(message.author.id, message.guild.id)
        const Member = message.member
        if (lvl.xp === 2500) {
          Member.roles.add(message.guild.roles.cache.find(r => r.id === '832501629990600725'))
          const ionianembed = new MessageEmbed()
            .setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
            .setTitle('Congratulations!')
            .setDescription(`You have earned the \`Ionian\` role! Chat more to earn more roles and permissions!`)
            .setFooter(`Role reward unlocked by ${message.author.username}`, message.author.displayAvatarURL())
            .setImage(`https://media.giphy.com/media/hI7xMa7RTQUEnwSgi8/giphy.gif`)
            .setColor('RANDOM')
          message.reply({embeds: [ionianembed]})
        }
        if (lvl.xp === 10000) {
          Member.roles.add(message.guild.roles.cache.find(r => r.id === '832501798324535306'))
          const dorianembed = new Discord.MessageEmbed()
            .setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
            .setTitle('Congratulations!')
            .setDescription(`You have earned the \`Dorian\` role! Chat more to earn more roles and permissions!`)
            .setFooter(`Role reward unlocked by ${message.author.username}`, message.author.displayAvatarURL())
            .setImage(`https://media.giphy.com/media/hI7xMa7RTQUEnwSgi8/giphy.gif`)
            .setColor('RANDOM')
          message.reply({embeds: [dorianembed]})
        }
        if (lvl.xp === 28900) {
          Member.roles.add(message.guild.roles.cache.find(r => r.id === '832501766650069023'))
          const phrygianembed = new Discord.MessageEmbed()
            .setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
            .setTitle('Congratulations!')
            .setDescription(`You have earned the \`Phrygian\` role! Chat more to earn more roles and permissions!`)
            .setFooter(`Role reward unlocked by ${message.author.username}`, message.author.displayAvatarURL())
            .setImage(`https://media.giphy.com/media/hI7xMa7RTQUEnwSgi8/giphy.gif`)
            .setColor('RANDOM')
          message.reply({embeds: [phrygianembed]})
        }
        if (lvl.xp === 48400) {
          Member.roles.add(message.guild.roles.cache.find(r => r.id === '832501737587474482'))
          const lydianembed = new Discord.MessageEmbed()
            .setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
            .setTitle('Congratulations!')
            .setDescription(`You have earned the \`Lydian\` role! Chat more to earn more roles and permissions!`)
            .setFooter(`Role reward unlocked by ${message.author.username}`, message.author.displayAvatarURL())
            .setImage(`https://media.giphy.com/media/hI7xMa7RTQUEnwSgi8/giphy.gif`)
            .setColor('RANDOM')
          message.reply({embeds: [lydianembed]})
        }
        if (lvl.xp === 90000) {
          Member.roles.add(message.guild.roles.cache.find(r => r.id === '832501733603278889'))
          const mixolydianembed = new Discord.MessageEmbed()
            .setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
            .setTitle('Congratulations!')
            .setDescription(`You have earned the \`Mixolydian\` role! Chat more to earn more roles and permissions!`)
            .setFooter(`Role reward unlocked by ${message.author.username}`, message.author.displayAvatarURL())
            .setImage(`https://media.giphy.com/media/hI7xMa7RTQUEnwSgi8/giphy.gif`)
            .setColor('RANDOM')
          message.reply({embeds: [mixolydianembed]})
        }
        if (lvl.xp === 122500) {
          Member.roles.add(message.guild.roles.cache.find(r => r.id === '832501731430498304'))
          const aeolianembed = new Discord.MessageEmbed()
            .setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
            .setTitle('Congratulations!')
            .setDescription(`You have earned the \`Aeolian\` role! Chat more to earn more roles and permissions!`)
            .setFooter(`Role reward unlocked by ${message.author.username}`, message.author.displayAvatarURL())
            .setImage(`https://media.giphy.com/media/hI7xMa7RTQUEnwSgi8/giphy.gif`)
            .setColor('RANDOM')
          message.reply({embeds: [aeolianembed]})
        }
        if (lvl.xp === 193600) {
          Member.roles.add(message.guild.roles.cache.find(r => r.id === '832501728817446932'))
          const locrianembed = new Discord.MessageEmbed()
            .setAuthor('ℭ𝔬𝔫𝔠𝔢𝔯𝔱𝔬 𝔡𝔦 ℭ𝔲𝔩𝔱𝔲𝔯𝔞')
            .setTitle('Congratulations!')
            .setDescription(`You have earned the \`Locrian\` role! Chat more to earn more roles and permissions!`)
            .setFooter(`Role reward unlocked by ${message.author.username}`, message.author.displayAvatarURL())
            .setImage(`https://media.giphy.com/media/hI7xMa7RTQUEnwSgi8/giphy.gif`)
            .setColor('RANDOM')
          message.reply({embeds: [locrianembed]})
        }
      }
    
})