const { Collection } = require("discord.js")
const client = require("../index");
const ms = require("ms")
const Timeout = new Collection()

client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(" ");

    let command = client.commands.get(cmd.toLowerCase());

    if (!command) command = client.commands.get(client.aliases.get(cmd.toLowerCase()))
    if (command) {
        if (command.timeout) {
          if (Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`You are on a \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), { long: true })}\` cooldown.`)
          command.run(client, message, args)
          Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.timeout)
          setTimeout(() => {
            Timeout.delete(`${command.name}${message.author.id}`)
          }, command.timeout)
        } else {
          command.run(client, message, args)
        }
    }
});
