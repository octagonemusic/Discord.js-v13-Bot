const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
    name: "color-roles",
    run: async(client, message, args) => {
        if(!args.length) return message.reply("Please specify one of the four color-roles embeds.")
        if (message.member.permissions.has("ADMINISTRATOR")) {
        if(args.join(' ') === "1") {
            
            const embed_1 = new MessageEmbed()
                .setAuthor(message.guild.name)
                .setTitle("Color-Roles!")
                .setDescription(`Pick your color roles here!`)
                .setColor("RANDOM")
            
            const row_1 = new MessageActionRow().addComponents(
                new MessageButton()
                    .setCustomId('red')
                    .setLabel('Red')
                    .setStyle("PRIMARY")
                    .setEmoji('♥'),

                new MessageButton()
                    .setCustomId('sky')
                    .setStyle("PRIMARY")
                    .setLabel("Sky")
                    .setEmoji("🔹"),
                
                new MessageButton()
                    .setCustomId('blue')
                    .setLabel("Blue")
                    .setStyle("PRIMARY")
                    .setEmoji("💙"),
                
                new MessageButton()
                    .setCustomId("sakura")
                    .setStyle("PRIMARY")
                    .setLabel("Sakura")
                    .setEmoji("<:ohayo:714785132040421417>"),

                new MessageButton()
                    .setCustomId("yellow")
                    .setStyle("PRIMARY")
                    .setLabel("Yellow")
                    .setEmoji("💛")
            )

            const row_2 = new MessageActionRow().addComponents(
                new MessageButton()
                    .setCustomId("purple")
                    .setStyle("PRIMARY")
                    .setLabel("Purple")
                    .setEmoji("💜"),

                new MessageButton()
                    .setCustomId("orange")
                    .setStyle("PRIMARY")
                    .setLabel("Orange")
                    .setEmoji("🧡"),

                new MessageButton()
                    .setCustomId("green")
                    .setStyle("PRIMARY")
                    .setLabel("Green")
                    .setEmoji("💚")
            )

            message.channel.send({ embeds: [embed_1], components: [row_1, row_2]})
        }

        if(args.join(' ') === "2") {
            
            const embed_1 = new MessageEmbed()
                .setAuthor(message.guild.name)
                .setTitle("Color-Roles Part 2!")
                .setDescription(`Pick your color roles here!`)
                .setColor("RANDOM")
            
            const row_1 = new MessageActionRow().addComponents(
                new MessageButton()
                    .setCustomId('black')
                    .setLabel('Black')
                    .setStyle("PRIMARY")
                    .setEmoji('<:yeahboi:815841720926601227>'),

                new MessageButton()
                    .setCustomId('grey')
                    .setStyle("PRIMARY")
                    .setLabel("Grey")
                    .setEmoji("<:sadloli:815934303320932372>"),
                
                new MessageButton()
                    .setCustomId('violetpink')
                    .setLabel("Violet Pink")
                    .setStyle("PRIMARY")
                    .setEmoji("<:SagiriiShy:822353186299838466>"),
                
                new MessageButton()
                    .setCustomId("brown")
                    .setStyle("PRIMARY")
                    .setLabel("Brown")
                    .setEmoji("<:chaos:884383732247695372>"),

                new MessageButton()
                    .setCustomId("turquoise")
                    .setStyle("PRIMARY")
                    .setLabel("Turquoise")
                    .setEmoji("<:2bgasm:815891346748604477>")
            )

            const row_2 = new MessageActionRow().addComponents(
                new MessageButton()
                    .setCustomId("orchid")
                    .setStyle("PRIMARY")
                    .setLabel("Orchid")
                    .setEmoji("<:wave:713043853241876510>"),

                new MessageButton()
                    .setCustomId("darkgreen")
                    .setStyle("PRIMARY")
                    .setLabel("Dark Green")
                    .setEmoji("<:pepeOK:816023363281354783>"),

                new MessageButton()
                    .setCustomId("cherry")
                    .setStyle("PRIMARY")
                    .setLabel("Cherry")
                    .setEmoji("🌸")
            )

            message.channel.send({ embeds: [embed_1], components: [row_1, row_2]})
        }
     } else return message.reply("You need admin permission to run this command.")
        
    }
}