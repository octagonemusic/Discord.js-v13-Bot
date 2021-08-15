const client = require("../index")
const { MessageEmbed, Invite, Message } = require("discord.js")
const moment = require("moment")
const ms = require("ms")


client.on("guildMemberAdd", async(member) => {

    if(member.user.bot) return
    if(!member.guild.id === "832467028802797578") return;
    
    const embed = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL({dynamic: true}))
        .setDescription(`${member} joined the server!`)
        .addFields(
            {
                name: `Name`,
                value: `${member.user.tag} (${member.user.id})`
            },
            {
                name: `Joined At`,
                value: moment(member.joinedAt).format('dddd, MMMM Do YYYY, h:mm A')
            }
        )
        .addField(`Account Age`, ms(member.joinedAt - member.user.createdAt, { long: true }), true)
        .addField(`Member Count`, member.guild.memberCount.toLocaleString(), true)
        .addField(`ID`, `\`\`\`js\nMember = ${member.user.id}\n\nGuild = ${member.guild.id}\`\`\``)
        .setColor("#39FF14")

        member.guild.channels.cache.get("832635276379553893").send({embeds: [embed]})
})

client.on("guildMemberRemove", async(member) => {

    const roles = member.roles.cache 
    .sort((a, b) => b.position - a.position)
    .map(role => role.toString())
    .slice(0, -1);

    let displayRoles;

    if(roles.length < 25) {
        displayRoles = roles.join(' ')
        if(roles.length < 1) displayRoles = "None" 

    } else {

        
        displayRoles = roles.slice(20).join(' ')
    }


    const embed = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL({dynamic: true}))
        .setDescription(`${member.user.tag} has left`)
        .addFields(
            {
                name: `User Information`,
                value: `${member.user.tag} (${member.user.id})`
            },
            {
                name: `Roles [${roles.length}]`,
                value: displayRoles
            },
            {
                name: `Joined At`,
                value: `${moment(member.joinedAt).format('dddd, MMMM Do YYYY, h:mm A')} (${ms(Date.now() - member.joinedAt, {long: true})} ago)`
            },
            {
                name: `Created At`,
                value: `${moment(member.user.createdAt).format('dddd, MMMM Do YYYY, h:mm A')} (${ms(member.joinedAt - member.user.createdAt, { long: true })} ago)`
            },
            {
                name: `ID`,
                value: `\`\`\`js\nMember = ${member.user.id}\n\nGuild = ${member.guild.id}\`\`\``
            }
        )
        .setColor("RED")

        member.guild.channels.cache.get("832635276379553893").send({embeds: [embed]})
})


