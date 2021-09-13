const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "help",
  description: "Shows all available bot commands.",
  options:  [
    {
     name: "command",
     description: "Type the name of the command",
     type: "STRING",
     required: false
     }
 ],
  run: async (client, interaction, args) => {

    const [name] = args

    const roleColor =
      interaction.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!name) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setAuthor(`Hi! I am ${client.user.tag}, a custom bot made for this server!`)
        .setTitle("📬 Need help? Here are all of my commands:")
        .addFields(categories)
        .setDescription(
          `**Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help ban\`.**`
        )
        .setFooter(
          `Requested by ${interaction.user.tag}`,
          interaction.user.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return interaction.followUp({embeds: [embed]});
    } else {
      const command =
        client.commands.get(name.toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(name.toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
          .setColor("FF0000");
        return interaction.followUp({embeds: [embed]});
      }

      const embed = new MessageEmbed()
        .setTitle("__Command Details!__")
        .addField("PREFIX:", `\`${prefix}\``)
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "USAGE:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "DESCRIPTION:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .setFooter(
          `Requested by ${interaction.user.tag}`,
          interaction.user.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return interaction.followUp({embeds: [embed]});
    }
  },
};