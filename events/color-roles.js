const client = require("../index");

client.on("interactionCreate", async(interaction) => {
    if(interaction.isButton()) {
        
        await interaction.deferReply({ ephemeral: true }).catch(() => {})

        const roles = ['843167253079130112', '843168911465119744', '843167906983313429', '843168458552508436', '843314453764505650', '843168970743873576', '843169170983223346', '843169059867852820', '855758393183961088', '843312540694872064', '843314992497033216', '843314042579189760', '843313097867526174', '843313845971714049', '843313320667906078', '843312665886851092', '843168561081483305']
        for (let i = 0; i < roles.length; i++) {
            if (interaction.member.roles.cache.has(roles[i])) {
                await interaction.member.roles.remove(roles[i])
            }
        }
        
        if(interaction.customId === "red") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'red')
           
            
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }

          if(interaction.customId === "sky") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'sky')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }
          if(interaction.customId === "blue") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'blue')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }
          if(interaction.customId === "sakura") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'sakura')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }

          if(interaction.customId === "purple") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'purple')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }

          if(interaction.customId === "yellow") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'yellow')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }

          if(interaction.customId === "orange") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'orange')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }

          if(interaction.customId === "green") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'green')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }

          if(interaction.customId === "black") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'black')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }

          if(interaction.customId === "grey") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'grey')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }

          if(interaction.customId === "violetpink") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'violet pink')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }

          if(interaction.customId === "turquoise") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'turquoise')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }

          if(interaction.customId === "brown") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'brown')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }

          if(interaction.customId === "orchid") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'orchid')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }

          if(interaction.customId === "darkgreen") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'darkgreen')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }

          if(interaction.customId === "cherry") {
             
            const role = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === 'cherry')
           
      
            if(interaction.member.roles.cache.has(role.id)){
              await interaction.guild.members.cache.get(interaction.user.id).roles.remove(role)
      
              interaction.editReply(`The ${role.name} role has been successfully removed!`)
      
            } else {
      
              await interaction.guild.members.cache.get(interaction.user.id).roles.add(role)
      
              interaction.editReply(`The ${role.name} role has been successfully added!`)
            }
          }

    }
})