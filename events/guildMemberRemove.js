const client = require("../index")

client.on("guildMemberRemove", async(member) => {
    const { guild } = member
    const { memberCount } = guild
    if (member.guild.id === "832467028802797578") {
      client.channels.cache.get("832995579142602802").send(`**See you later, ${member.user.tag}! We are at ${memberCount} members now!**`)
    }
  
})
    