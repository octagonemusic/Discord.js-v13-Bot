const { Client, Collection } = require("discord.js");

const client = new Client({
    intents: 32767,
    allowedMentions: { parse: ['users'], repliedUser: true }
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.aliases = new Collection()
client.slashCommands = new Collection();
client.config = require("./config.json");
client.snipes = new Collection()
client.esnipes = new Collection()

// Initializing the project
require("./handler")(client);

client.login(client.config.token);
