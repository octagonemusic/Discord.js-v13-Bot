const { MessageEmbed, MessageActionRow, MessageSelectMenu, Message } = require("discord.js")

module.exports = {
  name: "help",
  aliases: ["h", "commands"],
  description: "Shows list of available commands!",
  run: async(client, message, args) => {

    const directories = [
      ...new Set(client.commands.map((cmd) => cmd.directory))
    ]

    const formatString = (str) => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`

    const categories = directories.map((dir) => {
      const getCommands = client.commands.filter((cmd) => cmd.directory === dir).map(cmd => {
        return {
          name: cmd.name || "There is no name.",
          aliases: cmd.aliases || "There are no aliases for this command",
          description: cmd.description || "There is no description for this command."
        }
      })

      return {
        directory: formatString(dir),
        commands: getCommands,
      }
    })

    const embed = new MessageEmbed()
      .setAuthor(message.guild.name)
      .setTitle(`Help!`)
      .setDescription(`${message.author.tag}, Welcome to the help section! My prefix here is \`!\``)
      .addFields(
        {
          name: `Get my commands!`,
          value: `To view all my commands, please select the various categories from the dropdown below!`
        }
      )
      .setColor("RANDOM")
      .setFooter(`Help requested by ${message.author.tag} | Bot created by ${message.guild.members.cache.get("717166815943327764").user.tag}`, message.author.displayAvatarURL({dynamic: true}))

      const components = (state) => [
        new MessageActionRow().addComponents(
          new MessageSelectMenu()
            .setCustomId("help-menu")
            .setPlaceholder('Please select a command category')
            .setDisabled(state)
            .addOptions(
              categories.map((cmd) => {
                return {
                  label: cmd.directory,
                  value: cmd.directory.toLowerCase(),
                  description: `Commands from ${cmd.directory} category`
                }
              })
            )
        )
            ]

      const initialMessage = await message.reply({
        embeds: [embed],
        components: components(false)
      })

      const collector = message.channel.createMessageComponentCollector({
        componentType: "SELECT_MENU"
      })

      collector.on("collect", (interaction) => {
        const [ directory ] = interaction.values
        const category = categories.find(
          (x) => x.directory.toLowerCase() === directory
        )
      
      const categoryEmbed = new MessageEmbed()
          .setAuthor(message.guild.name)
          .setTitle(`${directory} Commands`)
          .setDescription("Here are the list of commands!")
          .setColor("RANDOM")
          .setFooter(`Requested by ${interaction.user.tag} | Bot created by ${message.guild.members.cache.get("717166815943327764").user.tag}`, interaction.user.displayAvatarURL({dynamic: true}))
          .addFields(
            category.commands.map((cmd) => {
              return {
                name: `\`${cmd.name}\``,
                value: cmd.description,
                inline: true,
              }
            })
          )
        interaction.update({embeds: [categoryEmbed]})
      })

      collector.on("end", () => {
        initialMessage.edit({components: components(true)})
      })
    //console.log(categories)
  }
}