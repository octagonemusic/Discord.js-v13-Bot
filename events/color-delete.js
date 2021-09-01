const client = require("../index")

client.on("messageCreate", async(message) => {

    if (message.channel.id === "832479757781827624") {
        message.delete()
    } 
})